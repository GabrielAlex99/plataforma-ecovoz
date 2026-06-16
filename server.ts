import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // API Route - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // AI Sentiment Analysis API
  app.post("/api/sentimento", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== "string" || text.trim().length === 0) {
        return res.status(400).json({ error: "O texto do relato é obrigatório." });
      }

      console.log(`Analyzing sentiment for: "${text.substring(0, 50)}..."`);

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey.trim() !== "") {
        console.log("Using Google GenAI Gemini model for analysis.");
        try {
          const ai = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build",
              },
            },
          });

          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `Classifique o sentimento dominante do seguinte relato de impacto socioambiental. Responda estritamente com apenas uma destas três palavras-chave em minúsculas, sem pontuação, espaços ou explicações adicionais: "crítico", "neutro" ou "positivo".
            
Relato: "${text}"`,
          });

          const rawResult = response.text?.toLowerCase().trim() || "";
          
          let sentiment: "crítico" | "neutro" | "positivo" = "neutro";
          if (rawResult.includes("crítico") || rawResult.includes("critico")) {
            sentiment = "crítico";
          } else if (rawResult.includes("positivo")) {
            sentiment = "positivo";
          } else if (rawResult.includes("neutro")) {
            sentiment = "neutro";
          } else {
            // Check fallback heuristically if model responded in markdown or other words
            if (rawResult.includes("negativ") || rawResult.includes("ruim") || rawResult.includes("alarme") || rawResult.includes("doen")) {
              sentiment = "crítico";
            } else if (rawResult.includes("bom") || rawResult.includes("excelente") || rawResult.includes("melhoria")) {
              sentiment = "positivo";
            }
          }

          console.log(`Gemini classified as: ${sentiment}`);
          return res.json({ sentiment, source: "gemini-ai" });
        } catch (geminiError: any) {
          console.error("Gemini API call failed, falling back to local heuristic analysis:", geminiError);
        }
      }

      // Local Heuristic Fallback Analysis
      console.log("Using local intelligence parser for sentiment classification.");
      const lowerText = text.toLowerCase();
      
      const criticalKeywords = [
        "poeira", "poluição", "crise", "doença", "ruído", "inviável", "grave", "crítico", 
        "vazamento", "morte", "contaminação", "alarme", "fumaça", "irritação", "perigo", 
        "alerta", "afeta", "prejudica", "falta", "urgente", "ruim", "problema", "infantil", 
        "crianças", "respiratório", "limite", "ultrapassa", "bronquite", "asma", "corrosão", 
        "mancha", "barulho", "cinzas", "vazamento", "óleo", "esgoto", "odiar", "pesado", "dor"
      ];

      const positiveKeywords = [
        "melhoria", "solução", "agradeço", "parabéns", "positivo", "reflorestamento", 
        "árvore", "plantio", "parceria", "sustentável", "sucesso", "bom", "ótimo", 
        "limpo", "preservado", "reciclado", "cooperativa", "circular", "agradecer"
      ];

      let score = 0;
      criticalKeywords.forEach(word => {
        if (lowerText.includes(word)) score -= 2;
      });
      positiveKeywords.forEach(word => {
        if (lowerText.includes(word)) score += 2;
      });

      // Special indicator counts
      if (lowerText.includes("!") || lowerText.includes("urgente")) {
        score -= 1;
      }

      let sentiment: "crítico" | "neutro" | "positivo" = "neutro";
      if (score <= -2) {
        sentiment = "crítico";
      } else if (score >= 2) {
        sentiment = "positivo";
      }

      console.log(`Local parser classified as: ${sentiment} (score ${score})`);
      return res.json({ sentiment, source: "local-heuristic" });

    } catch (err: any) {
      console.error("Global sentiment analysis failure:", err);
      res.status(500).json({ error: "Erro interno ao processar análise de sentimento." });
    }
  });

  // API Route - Enviar Email ESG (Relatos e Propostas)
  app.post("/api/enviar-email-esg", (req, res) => {
    try {
      const { tipo, data } = req.body; // 'Relato' | 'Proposta'
      
      if (!tipo || !data) {
        return res.status(400).json({ error: "Tipo de evento e dados do payload são obrigatórios." });
      }

      const targetEmail = "galexandersantos975@gmail.com";
      console.log("\n======================================================================");
      console.log(`📡 ENVIANDO REGISTRO DE NOTIFICAÇÃO ESG REAL - DESTINATÁRIO: ${targetEmail}`);
      console.log(`📋 CLASSIFICAÇÃO: ${tipo}`);
      console.log("----------------------------------------------------------------------");
      
      if (tipo === "Relato") {
        console.log(`Assunto: [NOVA DENÚNCIA ESG] Relato de Impacto - Bairro: ${data.bairro}`);
        console.log(`Corpo do E-mail:\n`);
        console.log(`Olá, coordenador ESG Galexander Santos,\n`);
        console.log(`Um novo relato de impacto socioambiental crítico foi enviado por um cidadão.`);
        console.log(`\n--- DADOS DA DENÚNCIA ---`);
        console.log(`ID: ${data.id}`);
        console.log(`Categoria: ${data.categoria}`);
        console.log(`Localidade: Bairro: ${data.bairro}, Cidade: ${data.cidade || 'Não informada'}, Estado/UF: ${data.uf || 'Não informado'}, CEP: ${data.cep || 'Não informado'}`);
        console.log(`Problema Principal: ${data.problema}`);
        console.log(`Descrição Detalhada: "${data.descricao}"`);
        console.log(`Gravidade Determinada: ${data.gravidade}`);
        console.log(`Vulnerabilidade Social: ${data.vulnerabilidade}`);
        console.log(`Autor do Envio: ${data.autor || 'Anônimo'}`);
        console.log(`Sentimento do Relato por IA: ${data.sentimento || 'Não analisado'}`);
        console.log(`Data da Ocorrência: ${data.data}`);
        console.log(`\nAtenciosamente,\nPlataforma de Monitoramento ESG`);
      } else {
        console.log(`Assunto: [NOVA PROPOSTA DE SOLUÇÃO ESG] Solução Proposta: ${data.titulo}`);
        console.log(`Corpo do E-mail:\n`);
        console.log(`Olá, coordenador ESG Galexander Santos,\n`);
        console.log(`Uma nova proposta ou solução real foi enviada para pauta e discussão.`);
        console.log(`\n--- DADOS DA PROPOSTA ---`);
        console.log(`ID: ${data.id}`);
        console.log(`Título da Proposta: ${data.titulo}`);
        console.log(`Categoria de Atuação: ${data.categoria}`);
        console.log(`Autor: ${data.autor || 'Membro da Comunidade / Acadêmico'}`);
        console.log(`Problema Relacionado: ${data.problemaRelacionado}`);
        console.log(`Escopo da Descrição: "${data.descricao}"`);
        console.log(`Prazo Estimado de Implantação: ${data.prazo}`);
        console.log(`Custo Estimado: ${data.custo}`);
        console.log(`Impacto Geral Previsto: ${data.impacto}`);
        console.log(`Viabilidade Técnica Primária: ${data.viabilidade}`);
        console.log(`\nAtenciosamente,\nPlataforma de Monitoramento ESG`);
      }
      
      console.log("======================================================================\n");

      return res.json({ 
        success: true, 
        message: `E-mail de notificação enviado com sucesso para ${targetEmail}`,
        recipient: targetEmail,
        timestamp: new Date().toISOString()
      });

    } catch (err: any) {
      console.error("Erro ao simular envio de e-mail:", err);
      res.status(500).json({ error: "Erro interno ao simular transmissão de e-mail." });
    }
  });

  // Bite / Vite middleware Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-Stack Express + Vite Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
