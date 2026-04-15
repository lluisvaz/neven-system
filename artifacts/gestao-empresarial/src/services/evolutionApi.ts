/**
 * Evolution API — Service Layer
 * 
 * Esta estrutura está pronta para ser integrada com a Evolution API.
 * Para integrar, defina a variável de ambiente VITE_EVOLUTION_API_URL
 * e VITE_EVOLUTION_API_KEY e descomente/implemente os métodos abaixo.
 * 
 * Documentação: https://doc.evolution-api.com
 */

export interface EvolutionInstance {
  instanceName: string;
  instanceId: string;
  status: "open" | "close" | "connecting";
  phoneNumber?: string;
  profileName?: string;
  profilePicUrl?: string;
}

export interface EvolutionMessage {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: {
    conversation?: string;
    extendedTextMessage?: { text: string };
    imageMessage?: { caption?: string; url?: string };
    documentMessage?: { title?: string; url?: string };
  };
  messageTimestamp: number;
  pushName?: string;
}

export interface EvolutionSendTextPayload {
  number: string;
  text: string;
  delay?: number;
}

export interface EvolutionQRCodeResponse {
  base64: string;
  code: string;
}

const BASE_URL = import.meta.env.VITE_EVOLUTION_API_URL ?? "";
const API_KEY = import.meta.env.VITE_EVOLUTION_API_KEY ?? "";

const headers = () => ({
  "Content-Type": "application/json",
  apikey: API_KEY,
});

export const evolutionApi = {
  /**
   * Retorna todas as instâncias criadas na Evolution API.
   */
  async fetchInstances(): Promise<EvolutionInstance[]> {
    // TODO: descomentar quando a Evolution API estiver configurada
    // const res = await fetch(`${BASE_URL}/instance/fetchInstances`, { headers: headers() });
    // if (!res.ok) throw new Error("Falha ao buscar instâncias");
    // return res.json();
    throw new Error("Evolution API não configurada. Defina VITE_EVOLUTION_API_URL e VITE_EVOLUTION_API_KEY.");
  },

  /**
   * Cria uma nova instância (número de WhatsApp) na Evolution API.
   */
  async createInstance(instanceName: string, number?: string): Promise<{ instance: EvolutionInstance; qrcode?: EvolutionQRCodeResponse }> {
    // TODO: implementar
    // const res = await fetch(`${BASE_URL}/instance/create`, {
    //   method: "POST",
    //   headers: headers(),
    //   body: JSON.stringify({ instanceName, number, qrcode: true }),
    // });
    // return res.json();
    throw new Error("Evolution API não configurada.");
  },

  /**
   * Retorna o QR Code de uma instância para conectar via WhatsApp Web.
   */
  async getQRCode(instanceName: string): Promise<EvolutionQRCodeResponse> {
    // TODO: implementar
    // const res = await fetch(`${BASE_URL}/instance/connect/${instanceName}`, { headers: headers() });
    // return res.json();
    throw new Error("Evolution API não configurada.");
  },

  /**
   * Desconecta/deleta uma instância da Evolution API.
   */
  async deleteInstance(instanceName: string): Promise<void> {
    // TODO: implementar
    // await fetch(`${BASE_URL}/instance/delete/${instanceName}`, { method: "DELETE", headers: headers() });
    throw new Error("Evolution API não configurada.");
  },

  /**
   * Envia uma mensagem de texto via WhatsApp.
   */
  async sendText(instanceName: string, payload: EvolutionSendTextPayload): Promise<void> {
    // TODO: implementar
    // await fetch(`${BASE_URL}/message/sendText/${instanceName}`, {
    //   method: "POST",
    //   headers: headers(),
    //   body: JSON.stringify(payload),
    // });
    throw new Error("Evolution API não configurada.");
  },

  /**
   * Busca mensagens de uma conversa (chat) específica.
   */
  async fetchMessages(instanceName: string, remoteJid: string, limit = 50): Promise<EvolutionMessage[]> {
    // TODO: implementar
    // const res = await fetch(`${BASE_URL}/chat/findMessages/${instanceName}`, {
    //   method: "POST",
    //   headers: headers(),
    //   body: JSON.stringify({ where: { key: { remoteJid } }, limit }),
    // });
    // return res.json();
    throw new Error("Evolution API não configurada.");
  },

  /**
   * Webhook: registra a URL de callback para receber eventos em tempo real.
   * Eventos: messages.upsert, messages.update, connection.update, etc.
   */
  async setWebhook(instanceName: string, webhookUrl: string): Promise<void> {
    // TODO: implementar
    // await fetch(`${BASE_URL}/webhook/set/${instanceName}`, {
    //   method: "POST",
    //   headers: headers(),
    //   body: JSON.stringify({
    //     url: webhookUrl,
    //     webhook_by_events: true,
    //     webhook_base64: false,
    //     events: ["messages.upsert", "messages.update", "connection.update", "send.message"],
    //   }),
    // });
    throw new Error("Evolution API não configurada.");
  },
};
