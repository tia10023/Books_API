const API_BASE = 'http://localhost:3000/api/books';

let editingId = null;

// Carica lista
async function loadBooks(page = 1, limit = 10) {
  const listEl = document.getElementById('booksList');
  listEl.innerHTML = '<div class="loading">Caricamento...</div>';

  try {
    const params = new URLSearchParams({ page, limit });
    const res = await fetch(`${API_BASE}?${params}`);
    const data = await res.json();
    
    if (data.data.length === 0) {
      listEl.innerHTML = '<p>Nessun libro trovato.</p>';
      return;
    }

    listEl.innerHTML = data.data.map(book => `
      <div class="book">
        <div>
          <h3>${book.title}</h3>
          <p><strong>${book.author}</strong> - ${book.year} (${book.genre})</p>
          <p>${book.isPublished ? '✅ Pubblicato' : '⏳ Bozza'}</p>
        </div>
        <div>
          <button class="edit" onclick="editBook(${book.id})">✏️ Modifica</button>
          <button class="delete" onclick="deleteBook(${book.id})">🗑️ Elimina</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    document.getElementById('booksList').innerHTML = `<div class="error">Errore: ${error.message}</div>`;
  }
}

// Modifica libro (riempi form)
async function editBook(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    const data = await res.json();
    const book = data.data;
    
    document.getElementById('id').value = book.id;
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    document.getElementById('genre').value = book.genre || 'Unknown';
    document.getElementById('isPublished').checked = book.isPublished;
    
    document.getElementById('submitBtn').textContent = '💾 Salva Modifiche';
    editingId = id;
    window.scrollTo(0, 0);
  } catch (error) {
    alert('Errore caricamento: ' + error.message);
  }
}

// Elimina libro
async function deleteBook(id) {
  if (!confirm('Sicuro di eliminare?')) return;
  
  try {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    loadBooks();
  } catch (error) {
    alert('Errore eliminazione: ' + error.message);
  }
}

// Submit form (create/update)
document.getElementById('bookForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    year: parseInt(document.getElementById('year').value),
    genre: document.getElementById('genre').value,
    isPublished: document.getElementById('isPublished').checked
  };

  try {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      clearForm();
      loadBooks();
    } else {
      const error = await res.json();
      alert('Errore: ' + error.error);
    }
  } catch (error) {
    alert('Errore rete: ' + error.message);
  }
});

// Pulisci form
function clearForm() {
  document.getElementById('bookForm').reset();
  document.getElementById('id').value = '';
  document.getElementById('submitBtn').textContent = '➕ Aggiungi Libro';
  editingId = null;
}

// Eventi
document.getElementById('clearBtn').onclick = clearForm;

// Carica al startup
loadBooks();
