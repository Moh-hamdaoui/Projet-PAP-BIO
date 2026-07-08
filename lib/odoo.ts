// Identifiants de connexion à l'instance Odoo, lus depuis les variables d'environnement (.env.local).
const ODOO_URL = process.env.ODOO_URL;
const ODOO_DB = process.env.ODOO_DB;
const ODOO_LOGIN = process.env.ODOO_LOGIN;
const ODOO_API_KEY = process.env.ODOO_API_KEY;

// Forme générique d'une réponse JSON-RPC renvoyée par Odoo.
type JsonRpcResponse<T> = {
  result?: T;
  error?: { message: string; data?: { message?: string } };
};

// Appelle l'endpoint JSON-RPC d'Odoo (/jsonrpc).
// `service` correspond à l'API Odoo ciblée : "common" pour l'authentification,
// "object" pour les opérations CRUD sur les modèles (execute_kw).
async function callOdoo<T>(service: "common" | "object", method: string, args: unknown[]): Promise<T> {
  if (!ODOO_URL || !ODOO_DB || !ODOO_LOGIN || !ODOO_API_KEY) {
    throw new Error("Configuration Odoo manquante (ODOO_URL, ODOO_DB, ODOO_LOGIN, ODOO_API_KEY)");
  }

  const response = await fetch(`${ODOO_URL}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: { service, method, args },
      id: Date.now(),
    }),
  });

  const json = (await response.json()) as JsonRpcResponse<T>;
  if (json.error) {
    throw new Error(json.error.data?.message ?? json.error.message);
  }
  return json.result as T;
}

// Authentifie l'utilisateur configuré et retourne son uid Odoo.
// Cet uid doit être passé à chaque appel `execute_kw` (search_read, create, write, unlink...).
async function authenticate(): Promise<number> {
  const uid = await callOdoo<number | false>("common", "authenticate", [
    ODOO_DB,
    ODOO_LOGIN,
    ODOO_API_KEY,
    {},
  ]);
  if (!uid) {
    throw new Error("Authentification Odoo échouée (identifiants ou clé API invalides)");
  }
  return uid;
}

// Lit des enregistrements d'un modèle Odoo (équivalent d'un SELECT).
// - `domain` : filtre au format Odoo, ex. [["default_code", "!=", false]].
// - `fields` : liste des champs à récupérer (sinon Odoo renvoie tous les champs).
// - `limit`  : nombre maximum de résultats.
export async function odooSearchRead<T>(
  model: string,
  domain: unknown[] = [],
  fields: string[] = [],
  limit?: number
): Promise<T[]> {
  const uid = await authenticate();
  return callOdoo<T[]>("object", "execute_kw", [
    ODOO_DB,
    uid,
    ODOO_API_KEY,
    model,
    "search_read",
    [domain, fields],
    limit ? { limit } : {},
  ]);
}

// Crée un nouvel enregistrement dans `model` et retourne son id.
export async function odooCreate(model: string, values: Record<string, unknown>): Promise<number> {
  const uid = await authenticate();
  return callOdoo<number>("object", "execute_kw", [ODOO_DB, uid, ODOO_API_KEY, model, "create", [values]]);
}

// Met à jour les enregistrements `ids` de `model` avec les valeurs fournies.
export async function odooWrite(model: string, ids: number[], values: Record<string, unknown>): Promise<boolean> {
  const uid = await authenticate();
  return callOdoo<boolean>("object", "execute_kw", [ODOO_DB, uid, ODOO_API_KEY, model, "write", [ids, values]]);
}

// Supprime les enregistrements `ids` de `model`.
export async function odooUnlink(model: string, ids: number[]): Promise<boolean> {
  const uid = await authenticate();
  return callOdoo<boolean>("object", "execute_kw", [ODOO_DB, uid, ODOO_API_KEY, model, "unlink", [ids]]);
}
