const GITHUB_API_URL = 'https://api.github.com';
const GIST_DESCRIPTION = 'Markdown Document - Created with Markdown Editor Pro';

// Obter token do localStorage
const getGitHubToken = () => {
  return localStorage.getItem('github_token');
};

// Salvar token no localStorage
const saveGitHubToken = (token) => {
  localStorage.setItem('github_token', token);
};

// Remover token
const removeGitHubToken = () => {
  localStorage.removeItem('github_token');
};

// Verificar se está autenticado
export const isGitHubAuthenticated = () => {
  return !!getGitHubToken();
};

// Obter dados do usuário GitHub
export const getGitHubUser = async () => {
  const token = getGitHubToken();
  if (!token) return null;

  try {
    const response = await fetch(`${GITHUB_API_URL}/user`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar usuário');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao obter usuário GitHub:', error);
    return null;
  }
};

// Criar novo Gist
export const createGist = async (filename, content, isPublic = false) => {
  const token = getGitHubToken();
  if (!token) throw new Error('Não autenticado');

  try {
    const response = await fetch(`${GITHUB_API_URL}/gists`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: GIST_DESCRIPTION,
        public: isPublic,
        files: {
          [filename]: {
            content
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao criar Gist');
    }

    const gist = await response.json();
    return gist;
  } catch (error) {
    console.error('Erro ao criar Gist:', error);
    throw error;
  }
};

// Atualizar Gist existente
export const updateGist = async (gistId, filename, content) => {
  const token = getGitHubToken();
  if (!token) throw new Error('Não autenticado');

  try {
    const response = await fetch(`${GITHUB_API_URL}/gists/${gistId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: {
          [filename]: {
            content
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar Gist');
    }

    const gist = await response.json();
    return gist;
  } catch (error) {
    console.error('Erro ao atualizar Gist:', error);
    throw error;
  }
};

// Listar Gists do usuário
export const listGists = async () => {
  const token = getGitHubToken();
  if (!token) throw new Error('Não autenticado');

  try {
    const response = await fetch(`${GITHUB_API_URL}/user/gists`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao listar Gists');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao listar Gists:', error);
    throw error;
  }
};

// Obter um Gist específico
export const getGist = async (gistId) => {
  const token = getGitHubToken();
  if (!token) throw new Error('Não autenticado');

  try {
    const response = await fetch(`${GITHUB_API_URL}/gists/${gistId}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar Gist');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar Gist:', error);
    throw error;
  }
};

// Deletar Gist
export const deleteGist = async (gistId) => {
  const token = getGitHubToken();
  if (!token) throw new Error('Não autenticado');

  try {
    const response = await fetch(`${GITHUB_API_URL}/gists/${gistId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok && response.status !== 204) {
      throw new Error('Erro ao deletar Gist');
    }

    return true;
  } catch (error) {
    console.error('Erro ao deletar Gist:', error);
    throw error;
  }
};

// Gerar URL de login com GitHub (usando Personal Access Token para simplicidade)
export const setGitHubToken = (token) => {
  saveGitHubToken(token);
};

// Logout
export const logoutGitHub = () => {
  removeGitHubToken();
};

// Obter arquivo de um Gist
export const getGistFileContent = async (gist, filename) => {
  if (!gist.files[filename]) {
    throw new Error('Arquivo não encontrado no Gist');
  }

  const file = gist.files[filename];
  
  if (file.size > 1000000) {
    // Se arquivo for muito grande, buscar do raw URL
    const response = await fetch(file.raw_url);
    return await response.text();
  }

  return file.content;
};
