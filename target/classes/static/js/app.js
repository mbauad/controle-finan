let transactions = [];
let editingId = null;

// Gerenciar descrições e categorias no localStorage
function getDescriptions() {
    return JSON.parse(localStorage.getItem('descriptions') || '[]');
}

function getCategories() {
    return JSON.parse(localStorage.getItem('categories') || '[]');
}

function addDescription(desc) {
    if (!desc.trim()) return;
    let descs = getDescriptions();
    if (!descs.includes(desc.trim())) {
        descs.push(desc.trim());
        localStorage.setItem('descriptions', JSON.stringify(descs));
    }
    updateDataList('descList', descs);
}

function addCategory(cat) {
    if (!cat.trim()) return;
    let cats = getCategories();
    if (!cats.includes(cat.trim())) {
        cats.push(cat.trim());
        localStorage.setItem('categories', JSON.stringify(cats));
    }
    updateDataList('catList', cats);
}

function updateDataList(listId, items) {
    const datalist = document.getElementById(listId);
    if (!datalist) return;
    datalist.innerHTML = items.map(item => `<option value="${item}">`).join('');
}

function addNewDesc() {
    const newDesc = prompt('📝 Digite uma nova descrição:');
    if (newDesc) {
        addDescription(newDesc);
        document.getElementById('desc').value = newDesc.trim();
    }
}

function editDesc() {
    const current = document.getElementById('desc').value;
    if (!current.trim()) {
        alert('Selecione uma descrição para editar');
        return;
    }
    const newDesc = prompt('📝 Nova descrição:', current);
    if (newDesc && newDesc !== current) {
        let descs = getDescriptions();
        const idx = descs.indexOf(current);
        if (idx !== -1) {
            descs[idx] = newDesc.trim();
            localStorage.setItem('descriptions', JSON.stringify(descs));
            document.getElementById('desc').value = newDesc.trim();
            updateDataList('descList', descs);
            showToast('✏️ Descrição atualizada!');
        }
    }
}

function deleteDesc() {
    const current = document.getElementById('desc').value;
    if (!current.trim()) {
        alert('Selecione uma descrição para deletar');
        return;
    }
    if (!confirm(`⚠️ Deletar \"${current}\"?`)) return;
    
    let descs = getDescriptions();
    descs = descs.filter(d => d !== current);
    localStorage.setItem('descriptions', JSON.stringify(descs));
    document.getElementById('desc').value = '';
    updateDataList('descList', descs);
    showToast('🗑️ Descrição deletada!');
}

function addNewCat() {
    const newCat = prompt('🏷️ Digite uma nova categoria:');
    if (newCat) {
        addCategory(newCat);
        document.getElementById('cat').value = newCat.trim();
    }
}

function editCat() {
    const current = document.getElementById('cat').value;
    if (!current.trim()) {
        alert('Selecione uma categoria para editar');
        return;
    }
    const newCat = prompt('🏷️ Nova categoria:', current);
    if (newCat && newCat !== current) {
        let cats = getCategories();
        const idx = cats.indexOf(current);
        if (idx !== -1) {
            cats[idx] = newCat.trim();
            localStorage.setItem('categories', JSON.stringify(cats));
            document.getElementById('cat').value = newCat.trim();
            updateDataList('catList', cats);
            showToast('✏️ Categoria atualizada!');
        }
    }
}

function deleteCat() {
    const current = document.getElementById('cat').value;
    if (!current.trim()) {
        alert('Selecione uma categoria para deletar');
        return;
    }
    if (!confirm(`⚠️ Deletar \"${current}\"?`)) return;
    
    let cats = getCategories();
    cats = cats.filter(c => c !== current);
    localStorage.setItem('categories', JSON.stringify(cats));
    document.getElementById('cat').value = '';
    updateDataList('catList', cats);
    showToast('🗑️ Categoria deletada!');
}

function formatCurrency(value) {
    return 'R$ ' + Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: ${type === 'success' ? '#00b894' : '#ff6b6b'};
        color: white;
        padding: 14px 24px;
        border-radius: 8px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            ...options
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        // Para DELETE e respostas vazias, retornar null
        const contentLength = response.headers.get('content-length');
        if (contentLength === '0' || response.status === 204) {
            return null;
        }
        
        // Tentar fazer parse JSON, mas se falhar retornar null
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    } catch (error) {
        showToast('Erro na requisição: ' + error.message, 'error');
        throw error;
    }
}

async function loadTransactions() {
    try {
        transactions = await apiCall('/api/transactions');
        renderTransactions();
        updateSummary();
    } catch (error) {
        console.error('Erro ao carregar transações:', error);
    }
}

function renderTransactions() {
    const tbody = document.getElementById('txList');
    if (!tbody) return;

    tbody.innerHTML = transactions.slice(0, 50).map(tx => `
        <tr data-id="${tx.id}">
            <td>${formatDate(tx.date)}</td>
            <td>${tx.description}</td>
            <td>${tx.category}</td>
            <td>
                <span style="color: ${tx.type === 'income' ? '#10b981' : '#ef4444'}; font-weight: 600;">
                    ${tx.type === 'income' ? '📈 Receita' : '📉 Despesa'}
                </span>
            </td>
            <td style="color: ${tx.type === 'income' ? '#10b981' : '#ef4444'}; font-weight: 700; text-shadow: 0 0 10px ${tx.type === 'income' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}">
                ${formatCurrency(tx.value)}
            </td>
            <td>
                <div class="actions-cell">
                    <button class="btn-edit" data-action="edit">✏️ Editar</button>
                    <button class="btn-delete" data-action="delete">🗑️ Deletar</button>
                </div>
            </td>
        </tr>
    `).join('');

    // Event delegation para botões
    tbody.addEventListener('click', handleTableActions);
}

function handleTableActions(e) {
    const action = e.target.closest('[data-action]');
    if (!action) return;

    const row = action.closest('tr');
    const id = row.getAttribute('data-id');

    if (action.getAttribute('data-action') === 'edit') {
        editTransaction(id);
    } else if (action.getAttribute('data-action') === 'delete') {
        deleteTransaction(id);
    }
}

function updateSummary() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.value, 0);
    
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.value, 0);

    const incomeEl = document.getElementById('totInc');
    const expenseEl = document.getElementById('totExp');
    const balanceEl = document.getElementById('bal');

    if (incomeEl) incomeEl.textContent = formatCurrency(income);
    if (expenseEl) expenseEl.textContent = formatCurrency(expense);
    if (balanceEl) balanceEl.textContent = formatCurrency(income - expense);
}

async function saveTransaction(e) {
    e.preventDefault();

    const transaction = {
        type: document.getElementById('type').value,
        description: document.getElementById('desc').value.trim(),
        value: parseFloat(document.getElementById('val').value),
        date: document.getElementById('date').value,
        category: document.getElementById('cat').value.trim(),
        notes: document.getElementById('notes').value.trim()
    };

    if (!transaction.description || !transaction.value || !transaction.date || !transaction.category) {
        showToast('Preencha todos os campos obrigatórios', 'error');
        return;
    }

    try {
        if (editingId) {
            // Atualizar
            await apiCall(`/api/transactions/${editingId}`, {
                method: 'PUT',
                body: JSON.stringify(transaction)
            });
            showToast('✏️ Transação atualizada com sucesso!');
            editingId = null;
        } else {
            // Criar
            await apiCall('/api/transactions', {
                method: 'POST',
                body: JSON.stringify(transaction)
            });
            showToast('✅ Transação criada com sucesso!');
        }
        // Adicionar às listas de sugestões
        addDescription(transaction.description);
        addCategory(transaction.category);
        closeModal();
        await loadTransactions();
    } catch (error) {
        showToast('Erro ao salvar transação', 'error');
    }
}

function editTransaction(id) {
    console.log('Editando transação:', id);
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) {
        console.error('Transação não encontrada:', id);
        return;
    }

    editingId = id;
    document.getElementById('type').value = transaction.type;
    document.getElementById('desc').value = transaction.description;
    document.getElementById('val').value = transaction.value;
    document.getElementById('date').value = transaction.date;
    document.getElementById('cat').value = transaction.category;
    document.getElementById('notes').value = transaction.notes || '';
    
    document.getElementById('modalTitle').textContent = '✏️ Editar Transação';
    document.getElementById('submitBtn').textContent = '💾 Atualizar';
    
    openModal();
}

async function deleteTransaction(id) {
    console.log('Deletando transação:', id);
    if (!confirm('⚠️ Tem certeza que deseja deletar esta transação?')) return;

    try {
        await apiCall(`/api/transactions/${id}`, { method: 'DELETE' });
        showToast('🗑️ Transação deletada com sucesso!');
        await loadTransactions();
    } catch (error) {
        showToast('Erro ao deletar transação', 'error');
        console.error('Erro ao deletar:', error);
    }
}

function openModal() {
    document.getElementById('modal').classList.add('active');
    updateDataList('descList', getDescriptions());
    updateDataList('catList', getCategories());
    if (!editingId) {
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('txForm').reset();
    editingId = null;
    document.getElementById('modalTitle').textContent = '➕ Nova Transação';
    document.getElementById('submitBtn').textContent = '💾 Salvar';
}

document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    
    // Fechar modal ao clicar fora
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') closeModal();
    });
});
