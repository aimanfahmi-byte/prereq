// prereq/script.js
document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
     Data / Defaults / Mappings
     =========================== */
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
      { code: "BBK3214", name: "Sastera Kanak-Kanak Dan Remaja", credit: 3 },
      { code: "BBK3210", name: "Teori Kesusasteraan", credit: 3 },
      { code: "BBK3212", name: "Kritikan Dalam Kesusasteraan Melayu", credit: 3 },
      { code: "BBK3310", name: "Kesusasteraan Epik Dan Histografi Melayu", credit: 3 },
    ],

    // Bahasa Inggeris
    "Bahasa Inggeris (Bahasa Inggeris)": [
      { code: "BBI3201", name: "General Linguistics", credit: 3 },
      { code: "BBI3212", name: "English Syntax And Morphology", credit: 3 },
      { code: "BBI3202", name: "English Phonetics And Phonology", credit: 3 },
      { code: "BBI3102", name: "Language Evolution And Change", credit: 3 },
      { code: "BBI3227", name: "Language And Mind", credit: 3 },
      { code: "BBI3219", name: "Semantics And Pragmatics", credit: 3 },
    ],

    // Kesusasteraan Inggeris
    "Kesusasteraan Inggeris (Kesusasteraan Inggeris)": [
      { code: "BBL3101", name: "Survey And Prose Forms", credit: 3 },
      { code: "BBL3404", name: "Analysing Novels And Short Stories", credit: 3 },
      { code: "BBL3405", name: "Writing About Literature", credit: 3 },
      { code: "BBL3406", name: "Analysing Poetry And Drama", credit: 3 },
      { code: "BBL3102", name: "Introduction To The History Of English Literature", credit: 3 },
      { code: "BBL3228", name: "Issues And Approaches In Contemporary Literary Theory", credit: 3 },
    ],
  };

  const defaultData = [
    {
      faculty: "Faculty of Modern Language and Communication",
      study: "Research",
      level: "Master",
      programme: "Bahasa Melayu (Bahasa Melayu)",
      credit: 9,
      status: "Active",
      courses: programmeCourses["Bahasa Melayu (Bahasa Melayu)"] || [],
    },
    {
      faculty: "Faculty of Modern Language and Communication",
      study: "Research",
      level: "PhD",
      programme: "Bahasa Melayu (Pengajian Wacana)",
      credit: 9,
      status: "Active",
      courses: programmeCourses["Bahasa Melayu (Pengajian Wacana)"] || [],
    },
    {
      faculty: "Faculty of Modern Language and Communication",
      study: "Research",
      level: "Master",
      programme: "Bahasa Melayu (Linguistik Bandingan Terapan)",
      credit: 9,
      status: "Active",
      courses: programmeCourses["Bahasa Melayu (Linguistik Bandingan Terapan)"] || [],
    },
    {
      faculty: "Faculty of Modern Language and Communication",
      study: "Research",
      level: "PhD",
      programme: "Kesusasteraan Melayu (Kesusasteraan Melayu)",
      credit: 18,
      status: "Active",
      courses: programmeCourses["Kesusasteraan Melayu (Kesusasteraan Melayu)"] || [],
    },
    {
      faculty: "Faculty of Modern Language and Communication",
      study: "Research",
      level: "Master",
      programme: "Bahasa Inggeris (Bahasa Inggeris)",
      credit: 18,
      status: "Inactive",
      courses: programmeCourses["Bahasa Inggeris (Bahasa Inggeris)"] || [],
    },
    {
      faculty: "Faculty of Modern Language and Communication",
      study: "Research",
      level: "PhD",
      programme: "Kesusasteraan Inggeris (Kesusasteraan Inggeris)",
      credit: 18,
      status: "Active",
      courses: programmeCourses["Kesusasteraan Inggeris (Kesusasteraan Inggeris)"] || [],
    },
  ];

  // Build programmeDefaults map from defaultData for easy lookup
  const programmeDefaults = defaultData.reduce((acc, rec) => {
    acc[rec.programme] = {
      faculty: rec.faculty,
      study: rec.study,
      level: rec.level,
      credit: rec.credit,
      status: rec.status,
      courses: Array.isArray(rec.courses) ? rec.courses.map(c => ({ ...c })) : [],
    };
    return acc;
  }, {});

  // Faculty -> programmes
  const facultyProgrammes = {
    "Faculty of Modern Language and Communication": [
      "Bahasa Melayu (Bahasa Melayu)",
      "Bahasa Melayu (Pengajian Wacana)",
      "Bahasa Melayu (Linguistik Bandingan Terapan)",
      "Kesusasteraan Melayu (Kesusasteraan Melayu)",
      "Bahasa Inggeris (Bahasa Inggeris)",
      "Kesusasteraan Inggeris (Kesusasteraan Inggeris)",
    ],
  };

  // Programme -> credit quick map (kept for backward compat)
  const programmeCredits = Object.fromEntries(
    Object.entries(programmeDefaults).map(([k, v]) => [k, v.credit])
  );

  /* ===========================
     DOM references (defensive)
     =========================== */
  const q = (id) => document.getElementById(id);

  // table + search + pagination controls
  const tableBody = q("tableBody");
  const searchInput = q("searchInput");
  const rowsPerPageSelect = q("rowsPerPage");
  const prevBtn = q("prevBtn");
  const nextBtn = q("nextBtn");

  // ADD modal elements
  const addModalEl = q("addModal");
  const addFaculty = q("addFaculty");
  const addStudy = q("addStudy");
  const addLevel = q("addLevel");
  const addProgramme = q("addProgramme");
  const addCredit = q("addCredit");
  const addStatus = q("addStatus");
  const add_AddCoursesBtn = q("add_AddCoursesBtn");
  const add_AddCoursesSelect = q("add_AddCoursesSelect");
  const addCoursesBody = q("addCoursesBody");
  const addForm = q("addForm");

  // EDIT modal elements
  const editModalEl = q("editModal");
  const editFaculty = q("editFaculty");
  const editStudy = q("editStudy");
  const editLevel = q("editLevel");
  const editProgramme = q("editProgramme");
  const editCredit = q("editCredit");
  const editStatus = q("editStatus");
  const edit_AddCoursesBtn = q("edit_AddCoursesBtn");
  const edit_AddCoursesSelect = q("edit_AddCoursesSelect");
  const editCoursesBody = q("editCoursesBody");
  const editForm = q("editForm");
  const editIndexInput = q("editIndex");

  // view / delete / toast
  const viewModalEl = q("viewModal");
  const deleteModalEl = q("deleteModal");
  const toastEl = q("successToast");
  const toastBody = toastEl ? toastEl.querySelector(".toast-body") : null;

  // Bootstrap modal wrappers (guarded)
  const viewModal = viewModalEl ? new bootstrap.Modal(viewModalEl) : null;
  const addModal = addModalEl ? new bootstrap.Modal(addModalEl) : null;
  const editModal = editModalEl ? new bootstrap.Modal(editModalEl) : null;
  const deleteModal = deleteModalEl ? new bootstrap.Modal(deleteModalEl) : null;
  const toast = toastEl ? new bootstrap.Toast(toastEl) : null;

  /* ===========================
     State variables
     =========================== */
  let currentPage = 1;
  let rowsPerPage = rowsPerPageSelect ? parseInt(rowsPerPageSelect.value, 10) || 3 : 3;
  let deleteIndex = null;

  /* ===========================
     Utilities
     =========================== */
  const safe = (fn) => { try { return fn(); } catch (_) { return null; } };

  function showToast(msg) {
    if (!toast || !toastBody) {
      // fallback alert if toast not present
      // eslint-disable-next-line no-alert
      alert(msg);
      return;
    }
    toastBody.textContent = msg;
    toast.show();
  }

  function escapeHtml(str) {
    return (str ?? "")
      .toString()
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function saveData() {
    try {
      localStorage.setItem("prereqData", JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save data:", e);
    }
  }

  function loadData() {
    const stored = localStorage.getItem("prereqData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 0) {
          data = parsed;
          return;
        }
      } catch (e) {
        console.warn("Failed to parse stored data:", e);
      }
    }
    // fallback to defaults
    data = [...defaultData.map(d => ({ ...d, courses: (d.courses || []).map(c => ({ ...c })) }))];
    saveData();
  }

  /* ===========================
     Courses table helpers
     =========================== */
  function clearCoursesTableFor(prefix) {
    const body = prefix === "add" ? addCoursesBody : editCoursesBody;
    if (!body) return;
    body.innerHTML = "";
  }

  function appendCourseRowFor(prefix, code = "", name = "", credit = "") {
    const body = prefix === "add" ? addCoursesBody : editCoursesBody;
    if (!body) return;
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
    if (!body) return;
    Array.from(body.querySelectorAll("tr")).forEach((tr, idx) => {
      const cell = tr.querySelector("td:first-child");
      if (cell) cell.textContent = idx + 1;
    });
  }

  // delegated course-delete
  if (addCoursesBody) {
    addCoursesBody.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-delete-course");
      if (!btn) return;
      btn.closest("tr")?.remove();
      refreshCourseNumbersFor("add");
    });
  }
  if (editCoursesBody) {
    editCoursesBody.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-delete-course");
      if (!btn) return;
      btn.closest("tr")?.remove();
      refreshCourseNumbersFor("edit");
    });
  }

  /* ===========================
     Dropdown population
     =========================== */
  function populateModalDropdowns(prefix) {
    const facultyEl = prefix === "add" ? addFaculty : editFaculty;
    const programmeEl = prefix === "add" ? addProgramme : editProgramme;
    const addCoursesSelectEl = prefix === "add" ? add_AddCoursesSelect : edit_AddCoursesSelect;
    const studyEl = prefix === "add" ? addStudy : editStudy;
    const levelEl = prefix === "add" ? addLevel : editLevel;
    const statusEl = prefix === "add" ? addStatus : editStatus;

    if (facultyEl) {
      facultyEl.innerHTML =
        `<option value="">-- Please Select --</option>` +
        Object.keys(facultyProgrammes).map(f => `<option value="${f}">${f}</option>`).join("");
    }

    updateProgrammeOptionsFor(prefix);

    if (studyEl) {
      studyEl.innerHTML = `
        <option value="">-- Please Select --</option>
        <option value="Research">Research</option>
        <option value="Coursework">Coursework</option>
      `;
    }

    if (levelEl) {
      levelEl.innerHTML = `
        <option value="">-- Please Select --</option>
        <option value="Master">Master</option>
        <option value="PhD">PhD</option>
      `;
    }

    if (statusEl) {
      statusEl.innerHTML = `
        <option value="">-- Please Select --</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      `;
    }

    // populate add/edit AddCoursesSelect too
    if (addCoursesSelectEl) {
      const facultyVal = facultyEl?.value || Object.keys(facultyProgrammes)[0];
      const related = facultyProgrammes[facultyVal] || [];
      addCoursesSelectEl.innerHTML = `<option value="">-- Choose --</option>` + related.map(p => `<option value="${p}">${p}</option>`).join("");
    }

    if (programmeEl && programmeEl.value) {
      // if programme pre-selected, we should also set programme-dependent values
      applyProgrammeDefaultsTo(prefix, programmeEl.value);
    }
  }

  function updateProgrammeOptionsFor(prefix) {
    const facultyEl = prefix === "add" ? addFaculty : editFaculty;
    const programmeEl = prefix === "add" ? addProgramme : editProgramme;
    const addCoursesSelectEl = prefix === "add" ? add_AddCoursesSelect : edit_AddCoursesSelect;
    const selectedFaculty = facultyEl?.value || Object.keys(facultyProgrammes)[0];
    const related = facultyProgrammes[selectedFaculty] || [];

    if (programmeEl) {
      programmeEl.innerHTML = `<option value="">-- Please Select --</option>` + related.map(p => `<option value="${p}">${p}</option>`).join("");
    }

    if (addCoursesSelectEl) {
      addCoursesSelectEl.innerHTML = `<option value="">-- Choose --</option>` + related.map(p => `<option value="${p}">${p}</option>`).join("");
    }
  }

  /* ===========================
     Auto-fill (programme -> all related fields + courses)
     =========================== */
  function applyProgrammeDefaultsTo(prefix, programmeValue) {
    if (!programmeValue) return;
    const def = programmeDefaults[programmeValue];
    if (!def) return;

    if (prefix === "add") {
      if (addFaculty) addFaculty.value = def.faculty || "";
      if (addStudy) addStudy.value = def.study || "";
      if (addLevel) addLevel.value = def.level || "";
      if (addCredit) addCredit.value = def.credit ?? "";
      if (addStatus) addStatus.value = def.status || "";

      // populate courses (replace current)
      clearCoursesTableFor("add");
      (def.courses || []).forEach(c => appendCourseRowFor("add", c.code, c.name, c.credit));
    } else {
      if (editFaculty) editFaculty.value = def.faculty || "";
      if (editStudy) editStudy.value = def.study || "";
      if (editLevel) editLevel.value = def.level || "";
      if (editCredit) editCredit.value = def.credit ?? "";
      if (editStatus) editStatus.value = def.status || "";

      clearCoursesTableFor("edit");
      (def.courses || []).forEach(c => appendCourseRowFor("edit", c.code, c.name, c.credit));
    }
  }

  function setupProgrammeChangeHandlers() {
    if (addProgramme) {
      addProgramme.addEventListener("change", () => {
        const selectedProgramme = addProgramme.value;
        // set credit if available (backwards compat)
        if (programmeCredits[selectedProgramme] !== undefined && addCredit) {
          addCredit.value = programmeCredits[selectedProgramme];
        } else if (addCredit) {
          addCredit.value = "";
        }
        // apply the broader default (faculty, study, level, status, courses)
        applyProgrammeDefaultsTo("add", selectedProgramme);
      });
    }

    if (editProgramme) {
      editProgramme.addEventListener("change", () => {
        const selectedProgramme = editProgramme.value;
        if (programmeCredits[selectedProgramme] !== undefined && editCredit) {
          editCredit.value = programmeCredits[selectedProgramme];
        } else if (editCredit) {
          editCredit.value = "";
        }
        applyProgrammeDefaultsTo("edit", selectedProgramme);
      });
    }
  }

  function setupFacultyChangeHandlers() {
    if (addFaculty) addFaculty.addEventListener("change", () => updateProgrammeOptionsFor("add"));
    if (editFaculty) editFaculty.addEventListener("change", () => updateProgrammeOptionsFor("edit"));
  }

  /* ===========================
     Add default courses buttons (Add+)
     =========================== */
  function setupAddCourseDefaultsHandlers() {
    if (add_AddCoursesBtn && add_AddCoursesSelect && addCoursesBody) {
      add_AddCoursesBtn.addEventListener("click", () => {
        const chosen = add_AddCoursesSelect.value;
        if (!chosen) {
          showToast("Select a programme to add its default courses.");
          return;
        }
        const facultyVal = addFaculty?.value;
        if (facultyVal && facultyVal !== "Faculty of Modern Language and Communication") {
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
    }

    if (edit_AddCoursesBtn && edit_AddCoursesSelect && editCoursesBody) {
      edit_AddCoursesBtn.addEventListener("click", () => {
        const chosen = edit_AddCoursesSelect.value;
        if (!chosen) {
          showToast("Select a programme to add its default courses.");
          return;
        }
        const facultyVal = editFaculty?.value;
        if (facultyVal && facultyVal !== "Faculty of Modern Language and Communication") {
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
  }

  /* ===========================
     Table rendering (with filtering & correct index mapping)
     =========================== */
  function renderTable() {
    if (!tableBody) return;
    const searchVal = (searchInput?.value || "").toLowerCase();

    // compute filtered original indices (so actions map to correct data index)
    const filteredIndices = data
      .map((rec, idx) => ({ rec, idx }))
      .filter(({ rec }) =>
        [rec.faculty, rec.study, rec.level, rec.programme, rec.status]
          .some(v => (v || "").toLowerCase().includes(searchVal))
      )
      .map(o => o.idx);

    const totalPages = Math.max(1, Math.ceil(filteredIndices.length / rowsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * rowsPerPage;
    const pageSlice = filteredIndices.slice(start, start + rowsPerPage);

    if (pageSlice.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" class="text-muted py-3">No matching records found</td></tr>`;
    } else {
      tableBody.innerHTML = pageSlice.map((origIndex, i) => {
        const r = data[origIndex];
        return `
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
                <button class="btn btn-info btn-sm" data-index="${origIndex}" data-action="view"><i class="fa fa-eye"></i></button>
                <button class="btn btn-warning btn-sm" data-index="${origIndex}" data-action="edit"><i class="fa fa-pen"></i></button>
                <button class="btn btn-danger btn-sm" data-index="${origIndex}" data-action="delete"><i class="fa fa-trash"></i></button>
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  }

  /* ===========================
     Table button delegation (view/edit/delete)
     =========================== */
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;
      const action = btn.getAttribute("data-action");
      const index = Number(btn.getAttribute("data-index"));
      if (Number.isNaN(index) || index < 0 || index >= data.length) return;
      if (action === "view") viewRecord(index);
      if (action === "edit") editRecord(index);
      if (action === "delete") confirmDelete(index);
    });
  }

  /* ===========================
     View record
     =========================== */
  function viewRecord(i) {
    const r = data[i];
    if (!r) return;
    const viewDetails = q("viewDetails");
    if (viewDetails) {
      viewDetails.innerHTML = `
        <tr><th style="width:35%;">Faculty</th><td>${escapeHtml(r.faculty)}</td></tr>
        <tr><th>Type of Study</th><td>${escapeHtml(r.study)}</td></tr>
        <tr><th>Level of Study</th><td>${escapeHtml(r.level)}</td></tr>
        <tr><th>Programme</th><td>${escapeHtml(r.programme)}</td></tr>
        <tr><th>Min Credit Hours</th><td>${escapeHtml(String(r.credit))}</td></tr>
        <tr><th>Status</th><td><span class="badge ${r.status === "Active" ? "bg-success" : "bg-secondary"}">${escapeHtml(r.status)}</span></td></tr>
      `;
    }

    const viewCoursesBody = q("viewCoursesBody");
    if (viewCoursesBody) {
      viewCoursesBody.innerHTML = "";
      if (Array.isArray(r.courses) && r.courses.length) {
        r.courses.forEach((c, idx) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td class="text-center">${idx + 1}</td><td>${escapeHtml(c.code)}</td><td>${escapeHtml(c.name)}</td><td class="text-center">${escapeHtml(String(c.credit))}</td>`;
          viewCoursesBody.appendChild(tr);
        });
        const wrap = q("viewCoursesWrap");
        if (wrap) wrap.style.display = "";
      } else {
        const wrap = q("viewCoursesWrap");
        if (wrap) wrap.style.display = "none";
      }
    }

    if (viewModal) viewModal.show();
  }

  /* ===========================
     Edit record
     =========================== */
  function editRecord(i) {
    const r = data[i];
    if (!r || !editForm) return;

    editIndexInput.value = i;
    populateModalDropdowns("edit");

    // fill values
    if (editFaculty) editFaculty.value = r.faculty;
    updateProgrammeOptionsFor("edit");
    if (editStudy) editStudy.value = r.study;
    if (editLevel) editLevel.value = r.level;
    if (editProgramme) editProgramme.value = r.programme;
    if (editCredit) editCredit.value = r.credit;
    if (editStatus) editStatus.value = r.status;

    // load courses
    clearCoursesTableFor("edit");
    if (Array.isArray(r.courses)) {
      r.courses.forEach(c => appendCourseRowFor("edit", c.code, c.name, c.credit));
    }

    if (editModal) editModal.show();
  }

  /* ===========================
     Delete record
     =========================== */
  function confirmDelete(i) {
    deleteIndex = i;
    if (deleteModal) deleteModal.show();
  }

  const confirmDeleteBtn = q("confirmDeleteBtn");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", () => {
      if (deleteIndex !== null && deleteIndex >= 0 && deleteIndex < data.length) {
        data.splice(deleteIndex, 1);
        saveData();
        deleteModal?.hide();
        renderTable();
        showToast("Record deleted!");
        deleteIndex = null;
      }
    });
  }

  /* ===========================
     Add / Edit submit handlers
     =========================== */
  if (addForm) {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!addFaculty?.value || !addProgramme?.value) {
        showToast("Please select both Faculty and Programme!");
        return;
      }
      if (!addStudy?.value || !addLevel?.value || !addStatus?.value) {
        showToast("Please complete all dropdown selections!");
        return;
      }

      const courses = Array.from(addCoursesBody?.querySelectorAll("tr") || []).map(tr => ({
        code: tr.querySelector(".course-code")?.value.trim() || "",
        name: tr.querySelector(".course-name")?.value.trim() || "",
        credit: parseInt(tr.querySelector(".course-credit")?.value, 10) || 0,
      }));

      const record = {
        faculty: addFaculty.value,
        study: addStudy.value,
        level: addLevel.value,
        programme: addProgramme.value,
        credit: parseInt(addCredit?.value, 10) || 0,
        status: addStatus.value,
        courses,
      };

      data.unshift(record);
      saveData();
      addModal?.hide();
      showToast("Record added!");
      currentPage = 1;
      renderTable();
    });
  }

  if (editForm) {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const idx = editIndexInput?.value;
      const index = idx === "" ? null : Number(idx);
      if (index === null || Number.isNaN(index) || index < 0 || index >= data.length) {
        showToast("Invalid record index.");
        return;
      }

      if (!editFaculty?.value || !editProgramme?.value) {
        showToast("Please select both Faculty and Programme!");
        return;
      }
      if (!editStudy?.value || !editLevel?.value || !editStatus?.value) {
        showToast("Please complete all dropdown selections!");
        return;
      }

      const courses = Array.from(editCoursesBody?.querySelectorAll("tr") || []).map(tr => ({
        code: tr.querySelector(".course-code")?.value.trim() || "",
        name: tr.querySelector(".course-name")?.value.trim() || "",
        credit: parseInt(tr.querySelector(".course-credit")?.value, 10) || 0,
      }));

      const record = {
        faculty: editFaculty.value,
        study: editStudy.value,
        level: editLevel.value,
        programme: editProgramme.value,
        credit: parseInt(editCredit?.value, 10) || 0,
        status: editStatus.value,
        courses,
      };

      data[index] = record;
      saveData();
      editModal?.hide();
      showToast("Record updated!");
      renderTable();
    });
  }

  /* ===========================
     Pagination + search wiring
     =========================== */
  if (rowsPerPageSelect) {
    rowsPerPageSelect.addEventListener("change", () => {
      rowsPerPage = parseInt(rowsPerPageSelect.value, 10) || 3;
      currentPage = 1;
      renderTable();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentPage++;
      renderTable();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      renderTable();
    });
  }

  /* ===========================
     Add button opens Add Modal
     =========================== */
  const addBtn = q("addBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addForm?.reset();
      clearCoursesTableFor("add");
      populateModalDropdowns("add");
      // ensure programme options reflect faculty default
      if (addFaculty && !addFaculty.value) addFaculty.value = Object.keys(facultyProgrammes)[0];
      updateProgrammeOptionsFor("add");
      addModal?.show();
    });
  }

  /* ===========================
     Developer reset button
     =========================== */
  const resetBtn = document.createElement("button");
  resetBtn.id = "resetBtn";
  resetBtn.className = "btn btn-outline-secondary btn-sm position-fixed";
  resetBtn.style.top = "1rem";
  resetBtn.style.left = "1rem";
  resetBtn.innerHTML = `<i class="fa fa-rotate-left me-1"></i> Reset Data`;
  document.body.appendChild(resetBtn);

  resetBtn.addEventListener("click", () => {
    // eslint-disable-next-line no-alert
    if (confirm("Reset all data to default values?")) {
      localStorage.removeItem("prereqData");
      data = [...defaultData.map(d => ({ ...d, courses: d.courses.map(c => ({ ...c })) }))];
      saveData();
      renderTable();
      showToast("Data reset to default!");
    }
  });

  /* ===========================
     Init
     =========================== */
  function init() {
    loadData();
    populateModalDropdowns("add");
    populateModalDropdowns("edit");
    setupProgrammeChangeHandlers();
    setupFacultyChangeHandlers();
    setupAddCourseDefaultsHandlers();
    renderTable();
  }

  init();
});
