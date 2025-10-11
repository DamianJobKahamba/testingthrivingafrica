// CV Builder functionality
const cvForm = document.getElementById("cvForm")
const previewButton = document.getElementById("previewCV")
const cvPreviewContent = document.getElementById("cvPreviewContent")

// Add education entry
let educationCount = 1
document.getElementById("addEducation")?.addEventListener("click", () => {
  educationCount++
  const educationContainer = document.getElementById("educationContainer")
  const newEntry = document.createElement("div")
  newEntry.className = "education-entry"
  newEntry.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label for="degree${educationCount}">Degree *</label>
                <input type="text" id="degree${educationCount}" name="degree${educationCount}" required placeholder="e.g., Bachelor of Science">
            </div>
            <div class="form-group">
                <label for="institution${educationCount}">Institution *</label>
                <input type="text" id="institution${educationCount}" name="institution${educationCount}" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="eduYear${educationCount}">Year of Graduation *</label>
                <input type="text" id="eduYear${educationCount}" name="eduYear${educationCount}" required placeholder="e.g., 2024">
            </div>
            <div class="form-group">
                <label for="gpa${educationCount}">GPA/Grade</label>
                <input type="text" id="gpa${educationCount}" name="gpa${educationCount}" placeholder="e.g., 3.8/4.0">
            </div>
        </div>
    `
  educationContainer.appendChild(newEntry)
})

// Add experience entry
let experienceCount = 1
document.getElementById("addExperience")?.addEventListener("click", () => {
  experienceCount++
  const experienceContainer = document.getElementById("experienceContainer")
  const newEntry = document.createElement("div")
  newEntry.className = "experience-entry"
  newEntry.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label for="jobTitle${experienceCount}">Job Title *</label>
                <input type="text" id="jobTitle${experienceCount}" name="jobTitle${experienceCount}" required>
            </div>
            <div class="form-group">
                <label for="company${experienceCount}">Company *</label>
                <input type="text" id="company${experienceCount}" name="company${experienceCount}" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="startDate${experienceCount}">Start Date *</label>
                <input type="text" id="startDate${experienceCount}" name="startDate${experienceCount}" required placeholder="e.g., Jan 2022">
            </div>
            <div class="form-group">
                <label for="endDate${experienceCount}">End Date</label>
                <input type="text" id="endDate${experienceCount}" name="endDate${experienceCount}" placeholder="Present or Month Year">
            </div>
        </div>
        <div class="form-group">
            <label for="jobDescription${experienceCount}">Description *</label>
            <textarea id="jobDescription${experienceCount}" name="jobDescription${experienceCount}" rows="3" required placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
    `
  experienceContainer.appendChild(newEntry)
})

// Preview CV
previewButton?.addEventListener("click", () => {
  const formData = new FormData(cvForm)

  let previewHTML = `
        <div style="font-family: var(--font-primary); color: var(--color-text); line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 3px solid var(--color-primary);">
                <h1 style="font-family: var(--font-display); color: var(--color-primary); margin-bottom: 0.5rem;">
                    ${formData.get("firstName")} ${formData.get("lastName")}
                </h1>
                <p style="color: var(--color-text-light);">
                    ${formData.get("email")} | ${formData.get("phone")}<br>
                    ${formData.get("location")}
                    ${formData.get("linkedin") ? `<br><a href="${formData.get("linkedin")}" style="color: var(--color-primary);">LinkedIn Profile</a>` : ""}
                </p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h2 style="color: var(--color-primary); border-bottom: 2px solid var(--color-accent); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                    Professional Summary
                </h2>
                <p>${formData.get("summary")}</p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h2 style="color: var(--color-primary); border-bottom: 2px solid var(--color-accent); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                    Education
                </h2>
    `

  // Add education entries
  for (let i = 1; i <= educationCount; i++) {
    if (formData.get(`degree${i}`)) {
      previewHTML += `
                <div style="margin-bottom: 1rem;">
                    <h3 style="color: var(--color-text); margin-bottom: 0.25rem;">${formData.get(`degree${i}`)}</h3>
                    <p style="color: var(--color-text-light); margin-bottom: 0.25rem;">
                        <strong>${formData.get(`institution${i}`)}</strong> | ${formData.get(`eduYear${i}`)}
                        ${formData.get(`gpa${i}`) ? ` | GPA: ${formData.get(`gpa${i}`)}` : ""}
                    </p>
                </div>
            `
    }
  }

  previewHTML += `
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h2 style="color: var(--color-primary); border-bottom: 2px solid var(--color-accent); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                    Work Experience
                </h2>
    `

  // Add experience entries
  for (let i = 1; i <= experienceCount; i++) {
    if (formData.get(`jobTitle${i}`)) {
      previewHTML += `
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="color: var(--color-text); margin-bottom: 0.25rem;">${formData.get(`jobTitle${i}`)}</h3>
                    <p style="color: var(--color-text-light); margin-bottom: 0.5rem;">
                        <strong>${formData.get(`company${i}`)}</strong> | ${formData.get(`startDate${i}`)} - ${formData.get(`endDate${i}`) || "Present"}
                    </p>
                    <p>${formData.get(`jobDescription${i}`)}</p>
                </div>
            `
    }
  }

  previewHTML += `
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h2 style="color: var(--color-primary); border-bottom: 2px solid var(--color-accent); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                    Skills
                </h2>
                <p>${formData.get("skills")}</p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h2 style="color: var(--color-primary); border-bottom: 2px solid var(--color-accent); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                    Languages
                </h2>
                <p>${formData.get("languages")}</p>
            </div>
    `

  if (formData.get("certifications")) {
    previewHTML += `
            <div style="margin-bottom: 2rem;">
                <h2 style="color: var(--color-primary); border-bottom: 2px solid var(--color-accent); padding-bottom: 0.5rem; margin-bottom: 1rem;">
                    Certifications & Awards
                </h2>
                <p>${formData.get("certifications")}</p>
            </div>
        `
  }

  previewHTML += `</div>`

  cvPreviewContent.innerHTML = previewHTML
})

// Form submission
cvForm?.addEventListener("submit", (e) => {
  e.preventDefault()

  // Trigger preview first
  previewButton.click()

  // Show success message
  alert(
    "CV Generated! You can now print this page or save it as PDF using your browser's print function (Ctrl+P or Cmd+P).",
  )

  // Optionally trigger print dialog
  setTimeout(() => {
    if (confirm("Would you like to print/save your CV now?")) {
      window.print()
    }
  }, 500)
})
