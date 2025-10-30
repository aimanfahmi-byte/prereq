// prereq/script.js
document.addEventListener("DOMContentLoaded", () => {
  let data = [];

  // mapping of programme => default courses (array of {code,name,credit})
  const programmeCourses = {
    // Bahasa Melayu group
    "Bahasa Melayu (Bahasa Melayu)": [
      { code: "BBM3108", name: "Sejarah Rumpun", credit: 3 },
      { code: "BBM3214", name: "Nahu Melayu", credit: 3 },
      { code: "BBM3401", name: "Bahasa Melayu Tinggi", credit: 3 },
    ],
    "Bahasa Melayu (Pengajian Wacana)": [
      { code: "BBM3108", name: "Sejarah Rumpun", credit: 3 },
      { code: "BBM3214", name: "Nahu Melayu", credit: 3 },
      { code: "BBM3401", name: "Bahasa Melayu Tinggi", credit: 3 },
    ],
    "Bahasa Melayu (Linguistik Bandingan Terapan)": [
      { code: "BBM3108", name: "Sejarah Rumpun", credit: 3 },
      { code: "BBM3214", name: "Nahu Melayu", credit: 3 },
      { code: "BBM3401", name: "Bahasa Melayu Tinggi", credit: 3 },
    ],

    // Kesusasteraan Melayu
    "Kesusasteraan Melayu (Kesusasteraan Melayu)": [
      { code: "BBK3102", name: "Sejarah Kesusasteraan Melayu", credit: 3 },
      { code: "BBK3305", name: "Kesusasteraan Rakyat Melayu", credit: 3 },
      { code: "BBK3214", name: "Sastera Kanak-Kanak Dan Remaia", credit: 3 },
      { code: "BBK3210", name: "Teori Kesusasteraan", credit: 3 },
      { code: "BBK3212", name: "Kritikan Dalam Kesusasteraan Melayu", credit: 3 },
      { code: "BBK3310", name: "Kesusasteraan Epik Dan Histografi Melayu", credit: 3 },
    ],

    // Bahasa Inggeris
    "Bahasa Inggeris (Bahasa Inggeris)": [
      { code: "BBI3201", name: "General Linguistics", credit: 3 },
      { code: "BBI3212", name: "Enalish Syntax And Morpholoav", credit: 3 },
      { code: "BBI3202", name: "English Phonetics And Phonoloay", credit: 3 },
      { code: "BBI3102", name: "Language Evolution And Change", credit: 3 },
      { code: "BBI3227", name: "Language And Mind", credit: 3 },
      { code: "BBI3219", name: "Semantics And Pragmatics", credit: 3 },
    ],

    // Kesusasteraan Inggeris
    "Kesusasteraan Inggeris (Kesusasteraan Inggeris)": [
      { code: "BBL3101", name: "Survey And Prose Forms", credit: 3 },
      { code: "BBL3404", name: "Analysina Novels And Short Stories", credit: 3 },
      { code: "BBL3405", name: "Writing About Literature", credit: 3 },
      { code: "BBL3406", name: "Analysina Poetry And Drama", credit: 3 },
      { code: "BBL3101", name: "Introduction To The History Of English Literature", credit: 3 },
      { code: "BBL3228", name: "Issues And Approaches In Contemporary Literary Theory", credit: 3 },
    ],
  };

  const defaultData = [
    { faculty: "Faculty of Modern Language and Communication", study: "Research", level: "Master", programme: "Bahasa Melayu (Bahasa Melayu)", credit: 9, status: "Active", courses: programmeCourses["Bahasa Melayu (Bahasa Melayu)"] || [] },
    { faculty: "Faculty of Modern Language and Communication", study: "Research", level: "PhD", programme: "Bahasa Melayu (Pengajian Wacana)", credit: 9, status: "Active", courses: programmeCourses["Bahasa Melayu (Pengajian Wacana)"] || [] },
    { faculty: "Faculty of Modern Language and Communication", study: "Research", level: "Master", programme: "Bahasa Melayu (Linguistik Bandingan Terapan)", credit: 9, status: "Active", courses: programmeCourses["Bahasa Melayu (Linguistik Bandingan Terapan)"] || [] },
    { faculty: "Faculty of Modern Language and Communication", study: "Research", level: "PhD", programme: "Kesusasteraan Melayu (Kesusasteraan Melayu)", credit: 18, status: "Active", courses: programmeCourses["Kesusasteraan Melayu (Kesusasteraan Melayu)"] || [] },
    { faculty: "Faculty of Modern Language and Communication", study: "Research", level: "Master", programme: "Bahasa Inggeris (Bahasa Inggeris)", credit: 18, status: "Inactive", courses: programmeCourses["Bahasa Inggeris (Bahasa Inggeris)"] || [] },
    { faculty: "Faculty of Modern Language and Communication", study: "Research", level: "PhD", programme: "Kesusasteraan Inggeris (Kesusasteraan Inggeris)", credit: 18, status: "Active", courses: programmeCourses["Kesusasteraan Inggeris (Kesusasteraan Inggeris)"] || [] },
  ];

  // ===== Data Handling =====
  function loadData() {
    const stored = localStorage.getItem("prereqData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          data = parsed;
        } else {
          data = [...defaultData];
          saveData();
        }
      } catch {
        data = [...defaultData];
        saveData();
      }
    } else {
      data = [...defaultData];
      saveData();
    }
  }

  function saveData() {
    try {
      localStorage.setItem("prereqData", JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save data:", e);
    }
  }

  // ===== Faculty → Programme Mapping =====
  const facultyProgrammes = {
    "Faculty of Modern Language and Communication": [
      "Bahasa Melayu (Bahasa Melayu)",
      "Bahasa Melayu (Pengajian Wacana)",
      "Bahasa Melayu (Linguistik Bandingan Terapan)",
      "Kesusasteraan Melayu (Kesusasteraan Melayu)",
      "Bahasa Inggeris (Bahasa Inggeris)",
      "Kesusasteraan Inggeris (Kesusasteraan Inggeris)"
    ],
  };

  // ===== Programme → Default Credit Mapping =====
  const programmeCredits = {
    "Bahasa Melayu (Bahasa Melayu)": 9,
    "Bahasa Melayu (Pengajian Wacana)": 9,
    "Bahasa Melayu (Linguistik Bandingan Terapan)": 9,
    "Kesusasteraan Melayu (Kesusasteraan Melayu)": 18,
    "Bahasa Inggeris (Bahasa Inggeris)": 18,
    "Kesusasteraan Inggeris (Kesusasteraan Inggeraan)": 18,
    "Kesusasteraan Inggeris (Kesusasteraan Inggeris)": 18,
  };

  // ===== UI Elements (global) =====
  const tableBody = document.getElementById("tableBody");
  const searchInput = document.getElementById("searchInput");
  const rowsPerPageSelect = document.getElementById("rowsPerPage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Add modal elements prefix: add_
  const addModalEl = document.getElementById("addModal");
  const addFaculty = document.getElementById("addFaculty");
  const addStudy = document.getElementById("addStudy");
  const addLevel = document.getElementById("addLevel");
  const addProgramme = document.getElementById("addProgramme");
  const addCredit = document.getElementById("addCredit");
  const addStatus = document.getElementById("addStatus");
  const add_AddCoursesBtn = document.getElementById("add_AddCoursesBtn");
  const add_AddCoursesSelect = document.getElementById("add_AddCoursesSelect");
  const addCoursesBody = document.getElementById("addCoursesBody");
  const addForm = document.getElementById("addForm");

  // Edit modal elements prefix: edit_
  const editModalEl = document.getElementById("editModal");
  const editFaculty = document.getElementById("editFaculty");
  const editStudy = document.getElementById("editStudy");
  const editLevel = document.getElementById("editLevel");
  const editProgramme = document.getElementById("editProgramme");
  const editCredit = document.getElementById("editCredit");
  const editStatus = document.getElementById("editStatus");
  const edit_AddCoursesBtn = document.getElementById("edit_AddCoursesBtn");
  const edit_AddCoursesSelect = document.getElementById("edit_AddCoursesSelect");
  const editCoursesBody = document.getElementById("editCoursesBody");
  const editForm = document.getElementById("editForm");
  const editIndexInput = document.getElementById("editIndex");

  // View / Delete / Toast
  const viewModalEl = document.getElementById("viewModal");
  const deleteModalEl = document.getElementById("deleteModal");
  const viewModal = new bootstrap.Modal(viewModalEl);
  const addModal = new bootstrap.Modal(addModalEl);
  const editModal = new bootstrap.Modal(editModalEl);
  const deleteModal = new bootstrap.Modal(deleteModalEl);

  const toastEl = document.getElementById("successToast");
  const toastBody = toastEl.querySelector(".toast-body");
  const toast = new bootstrap.Toast(toastEl);

  let currentPage = 1;
  let rowsPerPage = parseInt(rowsPerPageSelect.value, 10) || 3;
  let deleteIndex = null;

  // ===== Toast =====
  function showToast(msg) {
    toastBody.textContent = msg;
    toast.show();
  }

  // ===== HTML Escape Utility =====
  function escapeHtml(str) {
    return (str ?? "")
      .toString()
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  // ===== Dropdown population helpers for a modal (prefix = 'add' or 'edit') =====
  function populateModalDropdowns(prefix) {
    const facultyEl = prefix === "add" ? addFaculty : editFaculty;
    const programmeEl = prefix === "add" ? addProgramme : editProgramme;
    const addCoursesSelectEl = prefix === "add" ? add_AddCoursesSelect : edit_AddCoursesSelect;
    const studyEl = prefix === "add" ? addStudy : editStudy;
    const levelEl = prefix === "add" ? addLevel : editLevel;
    const statusEl = prefix === "add" ? addStatus : editStatus;

    facultyEl.innerHTML =
      `<option value="">-- Please Select --</option>` +
      Object.keys(facultyProgrammes)
        .map(f => `<option value="${f}">${f}</option>`)
        .join("");

    // also populate programme options (depends on faculty selection)
    updateProgrammeOptionsFor(prefix);

    // Study Dropdown
    studyEl.innerHTML = `
      <option value="">-- Please Select --</option>
      <option value="Research">Research</option>
      <option value="Coursework">Coursework</option>
    `;

    // Level Dropdown
    levelEl.innerHTML = `
      <option value="">-- Please Select --</option>
      <option value="Master">Master</option>
      <option value="PhD">PhD</option>
    `;

    // Status Dropdown
    statusEl.innerHTML = `
      <option value="">-- Please Select --</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    `;
  }

  function updateProgrammeOptionsFor(prefix) {
    const facultyEl = prefix === "add" ? addFaculty : editFaculty;
    const programmeEl = prefix === "add" ? addProgramme : editProgramme;
    const addCoursesSelectEl = prefix === "add" ? add_AddCoursesSelect : edit_AddCoursesSelect;
    const selectedFaculty = facultyEl.value;
    const related = facultyProgrammes[selectedFaculty] || [];
    programmeEl.innerHTML =
      `<option value="">-- Please Select --</option>` +
      related.map(p => `<option value="${p}">${p}</option>`).join("");
    addCoursesSelectEl.innerHTML =
      `<option value="">-- Choose --</option>` +
      related.map(p => `<option value="${p}">${p}</option>`).join("");
  }

  // ===== Auto-set Credit Based on Programme (for both modals) =====
  function setupProgrammeChangeHandlers() {
    addProgramme.addEventListener("change", () => {
      const selectedProgramme = addProgramme.value;
      if (programmeCredits[selectedProgramme] !== undefined) {
        addCredit.value = programmeCredits[selectedProgramme];
      } else {
        addCredit.value = "";
      }
    });
    editProgramme.addEventListener("change", () => {
      const selectedProgramme = editProgramme.value;
      if (programmeCredits[selectedProgramme] !== undefined) {
        editCredit.value = programmeCredits[selectedProgramme];
      } else {
        editCredit.value = "";
      }
    });
  }

  // faculty change updates programme options for each modal
  function setupFacultyChangeHandlers() {
    addFaculty.addEventListener("change", () => updateProgrammeOptionsFor("add"));
    editFaculty.addEventListener("change", () => updateProgrammeOptionsFor("edit"));
  }

  // ===== Table Rendering =====
  function renderTable() {
    const searchVal = (searchInput.value || "").toLowerCase();
    const filtered = data.filter(r =>
      [r.faculty, r.study, r.level, r.programme, r.status]
        .some(v => (v || "").toLowerCase().includes(searchVal))
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * rowsPerPage;
    const paginated = filtered.slice(start, start + rowsPerPage);

    if (paginated.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" class="text-muted py-3">No matching records found</td></tr>`;
    } else {
      tableBody.innerHTML = paginated.map((r, i) => `
        <tr>
          <td class="fw-medium">${start + i + 1}</td>
          <td class="text-start">${escapeHtml(r.faculty)}</td>
          <td>${escapeHtml(r.study)}</td>
          <td>${escapeHtml(r.level)}</td>
          <td>${escapeHtml(r.programme)}</td>
          <td>${escapeHtml(String(r.credit))}</td>
          <td><span class="badge ${r.status === "Active" ? "bg-success" : "bg-secondary"}">${escapeHtml(r.status)}</span></td>
          <td>
            <div class="d-flex justify-content-center gap-1">
              <button class="btn btn-info btn-sm" data-index="${start + i}" data-action="view"><i class="fa fa-eye"></i></button>
              <button class="btn btn-warning btn-sm" data-index="${start + i}" data-action="edit"><i class="fa fa-pen"></i></button>
              <button class="btn btn-danger btn-sm" data-index="${start + i}" data-action="delete"><i class="fa fa-trash"></i></button>
            </div>
          </td>
        </tr>
      `).join("");
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  // ===== Utilities for courses table (prefix-aware) =====
  function clearCoursesTableFor(prefix) {
    const body = prefix === "add" ? addCoursesBody : editCoursesBody;
    body.innerHTML = "";
  }

  function appendCourseRowFor(prefix, code, name, credit) {
    const body = prefix === "add" ? addCoursesBody : editCoursesBody;
    const tr = document.createElement("tr");
    tr.dataset.code = code || "";
    tr.innerHTML = `
      <td class="text-center"></td>
      <td><input type="text" class="form-control form-control-sm course-code" value="${escapeHtml(code || "")}" /></td>
      <td><input type="text" class="form-control form-control-sm course-name" value="${escapeHtml(name || "")}" /></td>
      <td><input type="number" class="form-control form-control-sm course-credit" value="${escapeHtml(String(credit || ""))}" /></td>
      <td class="text-center">
        <button type="button" class="btn btn-sm btn-outline-danger btn-delete-course" title="Delete"><i class="fa fa-trash"></i></button>
      </td>
    `;
    body.appendChild(tr);
    refreshCourseNumbersFor(prefix);
  }

  function refreshCourseNumbersFor(prefix) {
    const body = prefix === "add" ? addCoursesBody : editCoursesBody;
    Array.from(body.querySelectorAll("tr")).forEach((tr, idx) => {
      const cell = tr.querySelector("td:first-child");
      if (cell) cell.textContent = idx + 1;
    });
  }

  // Delegated delete for course rows inside modals (both)
  addCoursesBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-delete-course");
    if (!btn) return;
    const tr = btn.closest("tr");
    tr.remove();
    refreshCourseNumbersFor("add");
  });
  editCoursesBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-delete-course");
    if (!btn) return;
    const tr = btn.closest("tr");
    tr.remove();
    refreshCourseNumbersFor("edit");
  });

  // ===== Add default courses into modal when Add+ clicked =====
  function setupAddCourseDefaultsHandlers() {
    add_AddCoursesBtn.addEventListener("click", () => {
      const chosen = add_AddCoursesSelect.value;
      if (!chosen) {
        showToast("Select a programme to add its default courses.");
        return;
      }
      const facultyVal = addFaculty.value;
      if (facultyVal !== "Faculty of Modern Language and Communication") {
        showToast("Default courses currently available only for Faculty of Modern Language and Communication.");
        return;
      }
      const list = programmeCourses[chosen] || [];
      if (!list.length) {
        showToast("No default courses defined for this programme.");
        return;
      }
      list.forEach(item => {
        const exists = Array.from(addCoursesBody.querySelectorAll("tr")).some(tr => tr.dataset.code === item.code);
        if (!exists) appendCourseRowFor("add", item.code, item.name, item.credit);
      });
      refreshCourseNumbersFor("add");
      showToast("Default courses added to the record (you can delete individual rows).");
    });

    edit_AddCoursesBtn.addEventListener("click", () => {
      const chosen = edit_AddCoursesSelect.value;
      if (!chosen) {
        showToast("Select a programme to add its default courses.");
        return;
      }
      const facultyVal = editFaculty.value;
      if (facultyVal !== "Faculty of Modern Language and Communication") {
        showToast("Default courses currently available only for Faculty of Modern Language and Communication.");
        return;
      }
      const list = programmeCourses[chosen] || [];
      if (!list.length) {
        showToast("No default courses defined for this programme.");
        return;
      }
      list.forEach(item => {
        const exists = Array.from(editCoursesBody.querySelectorAll("tr")).some(tr => tr.dataset.code === item.code);
        if (!exists) appendCourseRowFor("edit", item.code, item.name, item.credit);
      });
      refreshCourseNumbersFor("edit");
      showToast("Default courses added to the record (you can delete individual rows).");
    });
  }

  // ===== Form Submit Handlers =====
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!addFaculty.value || !addProgramme.value) {
      showToast("Please select both Faculty and Programme!");
      return;
    }
    if (!addStudy.value || !addLevel.value || !addStatus.value) {
      showToast("Please complete all dropdown selections!");
      return;
    }

    const courses = Array.from(addCoursesBody.querySelectorAll("tr")).map(tr => ({
      code: tr.querySelector(".course-code").value.trim(),
      name: tr.querySelector(".course-name").value.trim(),
      credit: parseInt(tr.querySelector(".course-credit").value, 10) || 0
    }));

    const record = {
      faculty: addFaculty.value,
      study: addStudy.value,
      level: addLevel.value,
      programme: addProgramme.value,
      credit: parseInt(addCredit.value, 10) || 0,
      status: addStatus.value,
      courses
    };

    data.unshift(record);
    saveData();
    addModal.hide();
    showToast("Record added!");
    renderTable();
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const idx = editIndexInput.value;
    const index = idx === "" ? null : Number(idx);
    if (index === null || Number.isNaN(index) || index < 0 || index >= data.length) {
      showToast("Invalid record index.");
      return;
    }

    if (!editFaculty.value || !editProgramme.value) {
      showToast("Please select both Faculty and Programme!");
      return;
    }
    if (!editStudy.value || !editLevel.value || !editStatus.value) {
      showToast("Please complete all dropdown selections!");
      return;
    }

    const courses = Array.from(editCoursesBody.querySelectorAll("tr")).map(tr => ({
      code: tr.querySelector(".course-code").value.trim(),
      name: tr.querySelector(".course-name").value.trim(),
      credit: parseInt(tr.querySelector(".course-credit").value, 10) || 0
    }));

    const record = {
      faculty: editFaculty.value,
      study: editStudy.value,
      level: editLevel.value,
      programme: editProgramme.value,
      credit: parseInt(editCredit.value, 10) || 0,
      status: editStatus.value,
      courses
    };

    data[index] = record;
    saveData();
    editModal.hide();
    showToast("Record updated!");
    renderTable();
  });

  // ===== Delegated Table Buttons =====
  tableBody.addEventListener("click", e => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");
    const index = Number(btn.getAttribute("data-index"));
    if (Number.isNaN(index) || index < 0 || index >= data.length) return;

    if (action === "view") viewRecord(index);
    if (action === "edit") editRecord(index);
    if (action === "delete") confirmDelete(index);
  });

  // ===== View Record =====
  function viewRecord(i) {
    const r = data[i];
    document.getElementById("viewDetails").innerHTML = `
      <tr><th style="width:35%;">Faculty</th><td>${escapeHtml(r.faculty)}</td></tr>
      <tr><th>Type of Study</th><td>${escapeHtml(r.study)}</td></tr>
      <tr><th>Level of Study</th><td>${escapeHtml(r.level)}</td></tr>
      <tr><th>Programme</th><td>${escapeHtml(r.programme)}</td></tr>
      <tr><th>Min Credit Hours</th><td>${escapeHtml(String(r.credit))}</td></tr>
      <tr><th>Status</th><td><span class="badge ${r.status === "Active" ? "bg-success" : "bg-secondary"}">${escapeHtml(r.status)}</span></td></tr>
    `;

    // render courses in view modal
    const viewCoursesBody = document.getElementById("viewCoursesBody");
    viewCoursesBody.innerHTML = "";
    if (Array.isArray(r.courses) && r.courses.length) {
      r.courses.forEach((c, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td class="text-center">${idx + 1}</td><td>${escapeHtml(c.code)}</td><td>${escapeHtml(c.name)}</td><td class="text-center">${escapeHtml(String(c.credit))}</td>`;
        viewCoursesBody.appendChild(tr);
      });
      document.getElementById("viewCoursesWrap").style.display = "";
    } else {
      document.getElementById("viewCoursesWrap").style.display = "none";
    }

    viewModal.show();
  }

  // ===== Edit Record =====
  function editRecord(i) {
    const r = data[i];
    editIndexInput.value = i;
    populateModalDropdowns("edit");
    // fill values
    editFaculty.value = r.faculty;
    updateProgrammeOptionsFor("edit");
    editStudy.value = r.study;
    editLevel.value = r.level;
    editProgramme.value = r.programme;
    editCredit.value = r.credit;
    editStatus.value = r.status;

    // load courses
    clearCoursesTableFor("edit");
    if (Array.isArray(r.courses)) {
      r.courses.forEach(c => appendCourseRowFor("edit", c.code, c.name, c.credit));
    }
    editModal.show();
  }

  // ===== Delete Record =====
  function confirmDelete(i) {
    deleteIndex = i;
    deleteModal.show();
  }

  document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    if (deleteIndex !== null && deleteIndex >= 0 && deleteIndex < data.length) {
      data.splice(deleteIndex, 1);
      saveData();
      deleteModal.hide();
      renderTable();
      showToast("Record deleted!");
      deleteIndex = null;
    }
  });

  // ===== Pagination =====
  rowsPerPageSelect.addEventListener("change", () => {
    rowsPerPage = parseInt(rowsPerPageSelect.value, 10) || 3;
    currentPage = 1;
    renderTable();
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderTable();
  });

  // ===== Add button opens Add Modal (separate) =====
  document.getElementById("addBtn").addEventListener("click", () => {
    addForm.reset();
    clearCoursesTableFor("add");
    populateModalDropdowns("add");
    addModal.show();
  });

  // Developer Reset Button
  const resetBtn = document.createElement("button");
  resetBtn.id = "resetBtn";
  resetBtn.className = "btn btn-outline-secondary btn-sm position-fixed";
  resetBtn.style.top = "1rem";
  resetBtn.style.left = "1rem";
  resetBtn.innerHTML = `<i class="fa fa-rotate-left me-1"></i> Reset Data`;
  document.body.appendChild(resetBtn);

  resetBtn.addEventListener("click", () => {
    if (confirm("Reset all data to default values?")) {
      localStorage.removeItem("prereqData");
      data = [...defaultData];
      saveData();
      renderTable();
      showToast("Data reset to default!");
    }
  });

  // ===== Init wiring =====
  function init() {
    loadData();
    // populate both modals dropdowns
    populateModalDropdowns("add");
    populateModalDropdowns("edit");
    setupProgrammeChangeHandlers();
    setupFacultyChangeHandlers();
    setupAddCourseDefaultsHandlers();
    renderTable();
  }

  init();
});
