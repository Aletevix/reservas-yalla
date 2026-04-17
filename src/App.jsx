import React, { useMemo, useState } from "react";
import "./App.css";
import {
  Search,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  Users,
  FileText,
  CheckSquare,
  Truck,
  DollarSign,
  Briefcase,
  LifeBuoy,
  ChevronDown,
  Bell,
  Plus,
  Filter,
  Download,
  Menu,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const initialRows = [
  {
    id: 1,
    data: "17/04/2026",
    dia: "SEX",
    gestor: "ISMAEL",
    modelo: "BYD D1",
    locatario: "GLEDSON ALMEIDA DE LIMA",
    modalidade: "TRUST",
    horario: "18H",
    categoria: "VE",
    confirmadoLucas: "NÃO",
  },
  {
    id: 2,
    data: "16/04/2026",
    dia: "QUI",
    gestor: "RENATA",
    modelo: "MOBI",
    locatario: "ABNER FAVACHO",
    modalidade: "RENT",
    horario: "18:30:00",
    categoria: "MOBI",
    confirmadoLucas: "NÃO",
  },
  {
    id: 3,
    data: "17/04/2026",
    dia: "SEX",
    gestor: "MARCONY",
    modelo: "BYD KING / COROLLA / D1",
    locatario: "RAFAEL GOMES DOS REIS",
    modalidade: "TRUST",
    horario: "12:00:00",
    categoria: "SE OU VE ELETRIC",
    confirmadoLucas: "SIM",
  },
  {
    id: 4,
    data: "17/04/2026",
    dia: "SEX",
    gestor: "CAROLINE",
    modelo: "D1",
    locatario: "MARCIO JOSE BARBOSA FILHO",
    modalidade: "TRUST",
    horario: "18:00:00",
    categoria: "VE ELETRIC",
    confirmadoLucas: "SIM",
  },
  {
    id: 5,
    data: "17/04/2026",
    dia: "SEX",
    gestor: "DANIEL SAN",
    modelo: "SAVEIRO",
    locatario: "JOSE DONIZETTI",
    modalidade: "CARGAS",
    horario: "16:00:00",
    categoria: "GB CARGAS",
    confirmadoLucas: "SIM",
  },
  {
    id: 6,
    data: "17/04/2026",
    dia: "SEX",
    gestor: "CAROLINE",
    modelo: "KING",
    locatario: "LUCAS CASELI MATAVELLI",
    modalidade: "TRUST",
    horario: "17:00:00",
    categoria: "ES SEDAN ELETRIC",
    confirmadoLucas: "SIM",
  },
  {
    id: 7,
    data: "17/04/2026",
    dia: "SEX",
    gestor: "MATHEUS",
    modelo: "SPIN",
    locatario: "LUCAS FABIANO DIAS DE SOUZA",
    modalidade: "RENT",
    horario: "14:00:00",
    categoria: "MV MINIVAM",
    confirmadoLucas: "SIM",
  },
  {
    id: 8,
    data: "17/04/2026",
    dia: "SEX",
    gestor: "MATHEUS",
    modelo: "POLO TSI/SENSE",
    locatario: "EDILSON DE JESUS SILVA",
    modalidade: "RENT",
    horario: "17:00:00",
    categoria: "BS AUTOMATICO",
    confirmadoLucas: "SIM",
  },
];

const menuItems = [
  { label: "Home", icon: ClipboardList },
  { label: "Agenda", icon: CalendarDays },
  { label: "Tarefas", icon: CheckSquare },
  { label: "Mensagens", icon: MessageSquare },
  { label: "Clientes", icon: Users },
  { label: "Contratos", icon: FileText },
  { label: "Validação", icon: CheckSquare },
  { label: "Reservas", icon: CalendarDays, active: true },
  { label: "Frota", icon: Truck, hasArrow: true },
  { label: "Financeiro", icon: DollarSign, hasArrow: true },
  { label: "Yalla Carga", icon: Truck, hasArrow: true },
  { label: "Gestão da Frota", icon: Briefcase, hasArrow: true },
  { label: "Gestão da Operação", icon: Briefcase, hasArrow: true },
  { label: "Suporte", icon: LifeBuoy },
];

function getDayName(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const days = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  return days[date.getDay()];
}

function formatDateBR(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function StatCard({ title, value, subtitle, accent }) {
  return (
    <div className={`stat-card accent-${accent}`}>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-subtitle">{subtitle}</div>
    </div>
  );
}

function Badge({ value }) {
  const isYes = value === "SIM";
  return (
    <span className={`badge ${isYes ? "badge-yes" : "badge-no"}`}>{value}</span>
  );
}

function SelectField({ label, value, setValue, options }) {
  return (
    <div className="filter-field">
      <div className="filter-label">{label}</div>
      <select value={value} onChange={(e) => setValue(e.target.value)} className="select-field">
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function App() {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [gestorFilter, setGestorFilter] = useState("");
  const [modalidadeFilter, setModalidadeFilter] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [confirmadoFilter, setConfirmadoFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    data: "",
    gestor: "",
    modelo: "",
    locatario: "",
    modalidade: "",
    horario: "",
    categoria: "",
    confirmadoLucas: "NÃO",
  });

  const gestores = [...new Set(rows.map((r) => r.gestor))].sort();
  const modalidades = [...new Set(rows.map((r) => r.modalidade))].sort();
  const categorias = [...new Set(rows.map((r) => r.categoria))].sort();
  const datas = [...new Set(rows.map((r) => r.data))].sort();

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        !search ||
        [
          row.locatario,
          row.gestor,
          row.modelo,
          row.categoria,
          row.modalidade,
          row.horario,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDate = !dateFilter || row.data === dateFilter;
      const matchesGestor = !gestorFilter || row.gestor === gestorFilter;
      const matchesModalidade =
        !modalidadeFilter || row.modalidade === modalidadeFilter;
      const matchesCategoria =
        !categoriaFilter || row.categoria === categoriaFilter;
      const matchesConfirmado =
        !confirmadoFilter || row.confirmadoLucas === confirmadoFilter;

      return (
        matchesSearch &&
        matchesDate &&
        matchesGestor &&
        matchesModalidade &&
        matchesCategoria &&
        matchesConfirmado
      );
    });
  }, [
    rows,
    search,
    dateFilter,
    gestorFilter,
    modalidadeFilter,
    categoriaFilter,
    confirmadoFilter,
  ]);

  const totalSim = filteredRows.filter((r) => r.confirmadoLucas === "SIM").length;
  const totalNao = filteredRows.filter((r) => r.confirmadoLucas === "NÃO").length;
  const totalTrust = filteredRows.filter((r) => r.modalidade === "TRUST").length;
  const totalRent = filteredRows.filter((r) => r.modalidade === "RENT").length;

  function clearFilters() {
    setSearch("");
    setDateFilter("");
    setGestorFilter("");
    setModalidadeFilter("");
    setCategoriaFilter("");
    setConfirmadoFilter("");
  }

  function resetForm() {
    setForm({
      data: "",
      gestor: "",
      modelo: "",
      locatario: "",
      modalidade: "",
      horario: "",
      categoria: "",
      confirmadoLucas: "NÃO",
    });
  }

  function handleOpenModal() {
    resetForm();
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.data ||
      !form.gestor ||
      !form.modelo ||
      !form.locatario ||
      !form.modalidade ||
      !form.horario ||
      !form.categoria
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const newRow = {
      id: Date.now(),
      data: formatDateBR(form.data),
      dia: getDayName(form.data),
      gestor: form.gestor.toUpperCase(),
      modelo: form.modelo.toUpperCase(),
      locatario: form.locatario.toUpperCase(),
      modalidade: form.modalidade.toUpperCase(),
      horario: form.horario,
      categoria: form.categoria.toUpperCase(),
      confirmadoLucas: form.confirmadoLucas,
    };

    setRows((prev) => [newRow, ...prev]);
    setShowModal(false);
    resetForm();
  }

  return (
    <div className="app-shell">
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-top">
            <div className="logo-box">
              <div className="logo-text">YALLA</div>
              <span className="logo-version">v1.14.0</span>
            </div>
            <Menu size={22} />
          </div>

          <div className="menu-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`menu-item ${item.active ? "active" : ""}`}>
                  <div className="menu-left">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {item.hasArrow && <ChevronDown size={15} />}
                </div>
              );
            })}
          </div>

          <div className="sidebar-footer">
            <div className="sidebar-icons">
              <MessageSquare size={18} />
              <Bell size={18} />
            </div>

            <div className="user-box">
              <div className="avatar">AV</div>
              <div>
                <div className="user-name">Alexsander Vieira</div>
                <div className="user-email">alexsander.vieira@yallacar.com.br</div>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-link">
                <Settings size={15} />
                <span>Conta</span>
              </div>
              <div className="footer-link danger">
                <LogOut size={15} />
                <span>Sair</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="content">
          <div className="topbar">
            <div>
              <h1 className="page-title">Reservas</h1>
              <p className="page-subtitle">
                Visualize e controle todos os novos agendamentos e reservas da operação.
              </p>
            </div>

            <button className="primary-button" onClick={handleOpenModal}>
              <Plus size={16} />
              Novo
            </button>
          </div>

          <div className="stats-grid">
            <StatCard
              title="Confirmados"
              value={totalSim}
              subtitle="Reservas com confirmação"
              accent="green"
            />
            <StatCard
              title="Pendentes"
              value={totalNao}
              subtitle="Aguardando confirmação"
              accent="red"
            />
            <StatCard
              title="Trust"
              value={totalTrust}
              subtitle="Reservas modalidade Trust"
              accent="amber"
            />
            <StatCard
              title="Rent"
              value={totalRent}
              subtitle="Reservas modalidade Rent"
              accent="gray"
            />
          </div>

          <section className="panel">
            <div className="panel-header">
              <div>
                <div className="panel-title-row">
                  <CalendarDays size={20} />
                  <span>Novos</span>
                </div>
                <div className="panel-subtitle">Lista de reservas cadastradas</div>
              </div>

              <div className="panel-actions">
                <Download size={18} />
                <Filter size={18} />
              </div>
            </div>

            <div className="filters-grid">
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por locatário, gestor, modelo..."
                  className="search-input"
                />
              </div>

              <SelectField label="Data" value={dateFilter} setValue={setDateFilter} options={datas} />
              <SelectField label="Gestor" value={gestorFilter} setValue={setGestorFilter} options={gestores} />
              <SelectField
                label="Modalidade"
                value={modalidadeFilter}
                setValue={setModalidadeFilter}
                options={modalidades}
              />
              <SelectField
                label="Categoria"
                value={categoriaFilter}
                setValue={setCategoriaFilter}
                options={categorias}
              />
              <SelectField
                label="Confirmado Lucas"
                value={confirmadoFilter}
                setValue={setConfirmadoFilter}
                options={["SIM", "NÃO"]}
              />

              <button className="clear-button" onClick={clearFilters}>
                Limpar filtros
              </button>
            </div>

            <div className="table-wrapper">
              <table className="reservas-table">
                <thead>
                  <tr>
                    <th>DATA ↕</th>
                    <th>DIA ↕</th>
                    <th>GESTOR ↕</th>
                    <th>MODELO ↕</th>
                    <th>NOME LOCATARIO ↕</th>
                    <th>MODALIDADE ↕</th>
                    <th>HORARIO ↕</th>
                    <th>CATEGORIA ↕</th>
                    <th>CONFIRMADO LUCAS ↕</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.data}</td>
                      <td>{row.dia}</td>
                      <td>{row.gestor}</td>
                      <td>{row.modelo}</td>
                      <td>{row.locatario}</td>
                      <td>{row.modalidade}</td>
                      <td>{row.horario}</td>
                      <td>{row.categoria}</td>
                      <td>
                        <Badge value={row.confirmadoLucas} />
                      </td>
                    </tr>
                  ))}

                  {filteredRows.length === 0 && (
                    <tr>
                      <td colSpan="9" className="empty-row">
                        Nenhuma reserva encontrada com os filtros aplicados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="panel-footer">
              <div className="footer-count">
                Mostrando {filteredRows.length} de {rows.length} reservas
              </div>

              <div className="footer-right">
                <div className="pagination">
                  <button>‹</button>
                  <button className="active">1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>›</button>
                </div>

                <select className="page-size">
                  <option>25 por página</option>
                  <option>50 por página</option>
                  <option>100 por página</option>
                </select>
              </div>
            </div>
          </section>
        </main>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Nova reserva</h2>
                <p>Cadastre uma nova reserva no padrão que vocês usam hoje.</p>
              </div>

              <button className="icon-button" onClick={handleCloseModal}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-field">
                  <label>Data</label>
                  <input
                    type="date"
                    value={form.data}
                    onChange={(e) => setForm({ ...form, data: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Gestor</label>
                  <input
                    type="text"
                    value={form.gestor}
                    onChange={(e) => setForm({ ...form, gestor: e.target.value })}
                    placeholder="Ex.: ISMAEL"
                  />
                </div>

                <div className="form-field">
                  <label>Modelo</label>
                  <input
                    type="text"
                    value={form.modelo}
                    onChange={(e) => setForm({ ...form, modelo: e.target.value })}
                    placeholder="Ex.: BYD D1"
                  />
                </div>

                <div className="form-field">
                  <label>Nome locatário</label>
                  <input
                    type="text"
                    value={form.locatario}
                    onChange={(e) => setForm({ ...form, locatario: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>

                <div className="form-field">
                  <label>Modalidade</label>
                  <select
                    value={form.modalidade}
                    onChange={(e) => setForm({ ...form, modalidade: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    <option value="TRUST">TRUST</option>
                    <option value="RENT">RENT</option>
                    <option value="CARGAS">CARGAS</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Horário</label>
                  <input
                    type="text"
                    value={form.horario}
                    onChange={(e) => setForm({ ...form, horario: e.target.value })}
                    placeholder="Ex.: 18:00:00"
                  />
                </div>

                <div className="form-field">
                  <label>Categoria</label>
                  <input
                    type="text"
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    placeholder="Ex.: VE ELETRIC"
                  />
                </div>

                <div className="form-field">
                  <label>Confirmado Lucas</label>
                  <select
                    value={form.confirmadoLucas}
                    onChange={(e) =>
                      setForm({ ...form, confirmadoLucas: e.target.value })
                    }
                  >
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-button" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button type="submit" className="primary-button">
                  Salvar reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}