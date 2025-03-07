document.addEventListener('DOMContentLoaded', function() {
    let cvData = {
        template: 'minimal',
        primaryColor: '#2563eb',
        fontFamily: "'Roboto', sans-serif",
        personalInfo: {
            firstName: '',
            lastName: '',
            title: '',
            email: '',
            phone: '',
            address: '',
            photo: null
        },
        profile: '',
        experiences: [],
        education: [],
        skills: [],
        languages: [],
        socials: {
            linkedin: '',
            website: '',
            github: ''
        },
        qr: {
            include: false,
            type: 'linkedin'
        }
    };

    initApp();

    function initApp() {
        // Local Storage'dan kayıtlı CV verisini yüklemeyi kalıcı hale getirmek için bu satırı yorum satırına alın
        // loadSavedCV(); -- Bu satırı kaldırın veya yorum satırına alın
    
        setupEventListeners();
    
        updateCVPreview();
    
        addSampleDataButton();
    }

    function addSampleDataButton() {
        const templateSelector = document.querySelector('.template-selector');
        
        const sampleDataBtn = document.createElement('button');
        sampleDataBtn.className = 'btn btn-secondary';
        sampleDataBtn.style.marginTop = '20px';
        sampleDataBtn.style.width = '100%';
        sampleDataBtn.innerHTML = '<i class="fas fa-fill-drip"></i> Örnek Veri Doldur';
        sampleDataBtn.addEventListener('click', fillSampleData);
        templateSelector.appendChild(sampleDataBtn);
        
        const lastSavedCVId = localStorage.getItem('lastSavedCVId');
        if (lastSavedCVId) {
            const loadLastBtn = document.createElement('button');
            loadLastBtn.className = 'btn btn-secondary';
            loadLastBtn.style.marginTop = '10px';
            loadLastBtn.style.width = '100%';
            loadLastBtn.innerHTML = '<i class="fas fa-history"></i> Son Kaydı Yükle';
            loadLastBtn.addEventListener('click', () => loadCV(lastSavedCVId));
            templateSelector.appendChild(loadLastBtn);
        }
    }

    function fillSampleData() {
        cvData = {
            template: 'professional',
            primaryColor: '#10b981',
            fontFamily: "'Montserrat', sans-serif",
            personalInfo: {
                firstName: 'Ali',
                lastName: 'Yılmaz',
                title: 'Kıdemli Yazılım Geliştirici',
                email: 'ali.yilmaz@example.com',
                phone: '+90 (555) 123 45 67',
                address: 'Kadıköy, İstanbul, Türkiye',
                photo: null
            },
            profile: 'Yaklaşık 8 yıllık yazılım geliştirme tecrübesine sahip, müşteri odaklı çözümler üretmekten keyif alan bir yazılım geliştiriciyim. Frontend ve backend teknolojilerinde derin bilgi sahibi olup, özellikle JavaScript ekosisteminde uzmanlaşmış durumdayım. Çevik metodolojiler kullanarak takım çalışması içinde verimli ve kaliteli yazılım geliştirmeyi ilke edindim.',
            experiences: [
                {
                    company: 'Tech İnovasyon A.Ş.',
                    position: 'Kıdemli Yazılım Geliştirici',
                    startDate: '2021-06',
                    endDate: '',
                    currentJob: true,
                    description: 'Kurumsal müşteriler için web uygulamaları geliştirme, mikroservis mimarisi ile ölçeklenebilir backend sistemleri kurma, junior geliştiricileri mentorlama ve teknik görüşmelerde yer alma.'
                },
                {
                    company: 'Mobil Çözümler Ltd. Şti.',
                    position: 'Frontend Geliştirici',
                    startDate: '2018-03',
                    endDate: '2021-05',
                    currentJob: false,
                    description: 'React ve React Native ile mobil ve web uygulamaları geliştirme, performans optimizasyonu, state yönetimi ve UI/UX iyileştirmeleri yapma.'
                },
                {
                    company: 'Web Tasarım Hizmetleri',
                    position: 'Junior Web Geliştirici',
                    startDate: '2016-09',
                    endDate: '2018-02',
                    currentJob: false,
                    description: 'HTML, CSS ve JavaScript kullanarak duyarlı web siteleri geliştirme, WordPress tema ve eklenti özelleştirme.'
                }
            ],
            education: [
                {
                    school: 'İstanbul Teknik Üniversitesi',
                    degree: 'Bilgisayar Mühendisliği, Yüksek Lisans',
                    startDate: '2018-09',
                    endDate: '2020-06',
                    currentEducation: false,
                    description: 'Makine öğrenmesi ve veri bilimi üzerine uzmanlaşma. Tez: "Derin Öğrenme ile Doğal Dil İşleme Uygulamaları"'
                },
                {
                    school: 'Boğaziçi Üniversitesi',
                    degree: 'Bilgisayar Mühendisliği, Lisans',
                    startDate: '2014-09',
                    endDate: '2018-06',
                    currentEducation: false,
                    description: 'Yazılım geliştirme, veri yapıları ve algoritmalar üzerine kapsamlı eğitim. 3.78/4.00 GPA.'
                }
            ],
            skills: [
                'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Redux', 'HTML5', 'CSS3', 'SASS', 'Git', 'Docker', 'AWS', 'Jest', 'RESTful API', 'GraphQL'
            ],
            languages: [
                {
                    language: 'Türkçe',
                    proficiency: 'Anadil'
                },
                {
                    language: 'İngilizce',
                    proficiency: 'İleri'
                },
                {
                    language: 'Almanca',
                    proficiency: 'Orta'
                }
            ],
            socials: {
                linkedin: 'https://linkedin.com/in/user',
                website: 'https://cvmaker.glitch.me',
                github: 'https://github.com/ByNoSofware'
            },
            qr: {
                include: true,
                type: 'github'
            }
        };

        loadFormData();
        updateCVPreview();
        selectTemplate(document.querySelector(`.template-item[data-template="${cvData.template}"]`));
        selectColorScheme(cvData.primaryColor);

        alert('Örnek veriler başarıyla yüklendi!');
    }

    function setupEventListeners() {
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);

        document.getElementById('saveBtn').addEventListener('click', saveCV);
        document.getElementById('loadBtn').addEventListener('click', showSavedCVs);

        document.getElementById('exportBtn').addEventListener('click', showExportModal);
        document.getElementById('exportPDF').addEventListener('click', exportAsPDF);
        document.getElementById('exportPNG').addEventListener('click', exportAsPNG);
        
        document.getElementById('fullPreviewBtn').addEventListener('click', showFullPreview);

        document.querySelectorAll('.template-item').forEach(template => {
            template.addEventListener('click', () => selectTemplate(template));
        });

        document.getElementById('addPhotoBtn').addEventListener('click', () => {
            document.getElementById('profilePhoto').click();
        });

        document.getElementById('profilePhoto').addEventListener('change', handleProfilePhotoUpload);

        setupPersonalInfoListeners();

        document.getElementById('includeQR').addEventListener('change', handleQROptions);
        document.getElementById('qrType').addEventListener('change', () => {
            cvData.qr.type = document.getElementById('qrType').value;
            updateQRCode();
        });

        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                selectColorScheme(option.getAttribute('data-color'));
            });
        });

        document.getElementById('fontFamily').addEventListener('change', () => {
            cvData.fontFamily = document.getElementById('fontFamily').value;
            document.documentElement.style.setProperty('--font-family', cvData.fontFamily);
            document.getElementById('cvDocument').style.fontFamily = cvData.fontFamily;
        });

        document.getElementById('addSkill').addEventListener('click', addSkill);
        document.getElementById('skillInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
            }
        });

        document.getElementById('addExperience').addEventListener('click', addExperienceItem);
        document.getElementById('addEducation').addEventListener('click', addEducationItem);
        document.getElementById('addLanguage').addEventListener('click', addLanguageItem);

        document.querySelectorAll('.close-modal').forEach(close => {
            close.addEventListener('click', closeAllModals);
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeAllModals();
                }
            });
        });
    }

    function showExportModal() {
        document.getElementById('exportModal').classList.add('active');
    }

    function showFullPreview() {
        const fullPreviewContainer = document.getElementById('fullPreviewContainer');
        const cvDocument = document.getElementById('cvDocument').cloneNode(true);
        
        fullPreviewContainer.innerHTML = '';
        
        fullPreviewContainer.appendChild(cvDocument);
        
        document.getElementById('fullPreviewModal').classList.add('active');
    }

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    function setupPersonalInfoListeners() {
        document.getElementById('firstName').addEventListener('input', updatePersonalInfo);
        document.getElementById('lastName').addEventListener('input', updatePersonalInfo);
        document.getElementById('title').addEventListener('input', updatePersonalInfo);
        document.getElementById('email').addEventListener('input', updatePersonalInfo);
        document.getElementById('phone').addEventListener('input', updatePersonalInfo);
        document.getElementById('address').addEventListener('input', updatePersonalInfo);

        document.getElementById('profile').addEventListener('input', updateProfile);

        document.getElementById('linkedin').addEventListener('input', updateSocials);
        document.getElementById('website').addEventListener('input', updateSocials);
        document.getElementById('github').addEventListener('input', updateSocials);
    }

    function toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('#themeToggle i');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    function selectTemplate(templateEl) {
        document.querySelectorAll('.template-item').forEach(item => {
            item.classList.remove('active');
        });
        
        templateEl.classList.add('active');
        
        const selectedTemplate = templateEl.getAttribute('data-template');
        cvData.template = selectedTemplate;
        
        const cvDocument = document.getElementById('cvDocument');
        
        cvDocument.classList.remove('minimal-template', 'professional-template', 'creative-template', 'modern-template');
        
        cvDocument.classList.add(`${selectedTemplate}-template`);
        
        updateCVPreview();
    }

    function handleProfilePhotoUpload(e) {
        const file = e.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const profilePhotoPreview = document.getElementById('profilePhotoPreview');
                profilePhotoPreview.innerHTML = `<img src="${event.target.result}" alt="Profil Fotoğrafı">`;
                
                cvData.personalInfo.photo = event.target.result;
                
                const cvPhoto = document.getElementById('cvPhoto');
                cvPhoto.innerHTML = `<img src="${event.target.result}" alt="Profil Fotoğrafı">`;
            };
            
            reader.readAsDataURL(file);
        }
    }

    function updatePersonalInfo() {
        cvData.personalInfo.firstName = document.getElementById('firstName').value;
        cvData.personalInfo.lastName = document.getElementById('lastName').value;
        cvData.personalInfo.title = document.getElementById('title').value;
        cvData.personalInfo.email = document.getElementById('email').value;
        cvData.personalInfo.phone = document.getElementById('phone').value;
        cvData.personalInfo.address = document.getElementById('address').value;
        
        updatePersonalInfoPreview();
    }

    function updatePersonalInfoPreview() {
        document.getElementById('previewFirstName').textContent = cvData.personalInfo.firstName || 'Ad';
        document.getElementById('previewLastName').textContent = cvData.personalInfo.lastName || 'Soyad';
        document.getElementById('previewTitle').textContent = cvData.personalInfo.title || 'Profesyonel Başlık';
        document.getElementById('previewEmail').textContent = cvData.personalInfo.email || 'ornek@eposta.com';
        document.getElementById('previewPhone').textContent = cvData.personalInfo.phone || '+90 (___) ___ __ __';
        document.getElementById('previewAddress').textContent = cvData.personalInfo.address || 'Adres bilgileriniz';
    }

    function updateProfile() {
        cvData.profile = document.getElementById('profile').value;
        
        document.getElementById('previewProfile').textContent = cvData.profile || 'Kendinizi tanıtan kısa bir paragraf.';
    }

    function updateSocials() {
        cvData.socials.linkedin = document.getElementById('linkedin').value;
        cvData.socials.website = document.getElementById('website').value;
        cvData.socials.github = document.getElementById('github').value;
        
        updateSocialsPreview();
        
        if (cvData.qr.include) {
            updateQRCode();
        }
    }

    function updateSocialsPreview() {
        const linkedinEl = document.getElementById('previewLinkedin');
        const websiteEl = document.getElementById('previewWebsite');
        const githubEl = document.getElementById('previewGithub');
        const socialSection = document.querySelector('.social-section');
        
        if (cvData.socials.linkedin) {
            linkedinEl.style.display = 'flex';
            linkedinEl.querySelector('span').textContent = 'LinkedIn';
        } else {
            linkedinEl.style.display = 'none';
        }
        
        if (cvData.socials.website) {
            websiteEl.style.display = 'flex';
            websiteEl.querySelector('span').textContent = cvData.socials.website.replace(/(^\w+:|^)\/\//, '').split('/')[0];
        } else {
            websiteEl.style.display = 'none';
        }
        
        if (cvData.socials.github) {
            githubEl.style.display = 'flex';
            githubEl.querySelector('span').textContent = 'GitHub';
        } else {
            githubEl.style.display = 'none';
        }
        
        if (!cvData.socials.linkedin && !cvData.socials.website && !cvData.socials.github) {
            socialSection.style.display = 'none';
        } else {
            socialSection.style.display = 'block';
        }
    }

function selectColorScheme(color) {
    document.querySelectorAll('.color-option').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelector(`.color-option[data-color="${color}"]`).classList.add('active');
    
    cvData.primaryColor = color;
    document.documentElement.style.setProperty('--primary-color', color);
    
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    document.documentElement.style.setProperty('--primary-color-rgb', `${r}, ${g}, ${b}`);
    
    const hoverColor = adjustColorBrightness(color, -15);
    document.documentElement.style.setProperty('--primary-hover', hoverColor);
    
    if (cvData.qr.include) {
        updateQRCode();
    }
}

    function adjustColorBrightness(hex, percent) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        
        r = Math.max(0, Math.min(255, r + percent));
        g = Math.max(0, Math.min(255, g + percent));
        b = Math.max(0, Math.min(255, b + percent));
        
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    function addSkill() {
        const skillInput = document.getElementById('skillInput');
        const skillValue = skillInput.value.trim();
        
        if (skillValue) {
            cvData.skills.push(skillValue);
            
            updateSkillTags();
            
            skillInput.value = '';
            skillInput.focus();
        }
    }

    function removeSkill(index) {
        cvData.skills.splice(index, 1);
        
        updateSkillTags();
    }

    function updateSkillTags() {
        const skillTagsContainer = document.getElementById('skillTags');
        const previewSkillsContainer = document.getElementById('previewSkills');
        const skillsSection = document.querySelector('.skills-section');
        
        skillTagsContainer.innerHTML = '';
        previewSkillsContainer.innerHTML = '';
        
        cvData.skills.forEach((skill, index) => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.innerHTML = `
                ${skill}
                <i class="fas fa-times" data-index="${index}"></i>
            `;
            skillTagsContainer.appendChild(skillTag);
            
            skillTag.querySelector('i').addEventListener('click', () => {
                removeSkill(index);
            });
            
            const previewSkill = document.createElement('div');
            previewSkill.className = 'cv-skill';
            previewSkill.textContent = skill;
            previewSkillsContainer.appendChild(previewSkill);
        });
        
        if (cvData.skills.length === 0) {
            skillsSection.style.display = 'none';
        } else {
            skillsSection.style.display = 'block';
        }
    }

    function addExperienceItem() {
        const experienceItems = document.getElementById('experienceItems');
        
        const template = document.getElementById('experienceTemplate');
        const newExperience = template.content.cloneNode(true);
        
        setupExperienceItemEvents(newExperience);
        
        experienceItems.appendChild(newExperience);
        
        cvData.experiences.push({
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            currentJob: false,
            description: ''
        });
        
        updateExperienceInputs();
    }

    function setupExperienceItemEvents(experienceItem) {
        const index = cvData.experiences.length;
        
        experienceItem.querySelector('.company').addEventListener('input', () => updateExperienceData(index));
        experienceItem.querySelector('.position').addEventListener('input', () => updateExperienceData(index));
        experienceItem.querySelector('.startDate').addEventListener('input', () => updateExperienceData(index));
        experienceItem.querySelector('.endDate').addEventListener('input', () => updateExperienceData(index));
        experienceItem.querySelector('.currentJob').addEventListener('change', (e) => {
            const endDateInput = e.target.closest('.end-date-group').querySelector('.endDate');
            endDateInput.disabled = e.target.checked;
            updateExperienceData(index);
        });
        experienceItem.querySelector('.description').addEventListener('input', () => updateExperienceData(index));
        
        experienceItem.querySelector('.remove-item').addEventListener('click', () => {
            removeExperienceItem(index);
        });
    }

    function updateExperienceData(index) {
        const experienceItems = document.querySelectorAll('#experienceItems .experience-item');
        
        experienceItems.forEach((item, i) => {
            cvData.experiences[i] = {
                company: item.querySelector('.company').value,
                position: item.querySelector('.position').value,
                startDate: item.querySelector('.startDate').value,
                endDate: item.querySelector('.endDate').value,
                currentJob: item.querySelector('.currentJob').checked,
                description: item.querySelector('.description').value
            };
        });
        
        updateExperiencePreview();
    }

    function removeExperienceItem(index) {
        cvData.experiences.splice(index, 1);
        
        const experienceItems = document.querySelectorAll('#experienceItems .experience-item');
        experienceItems[index].remove();
        
        updateExperienceInputs();
        
        updateExperiencePreview();
    }

    function updateExperienceInputs() {
        const experienceItems = document.querySelectorAll('#experienceItems .experience-item');
        
        experienceItems.forEach((item, index) => {
            item.querySelector('.remove-item').addEventListener('click', () => {
                removeExperienceItem(index);
            });
            
            item.querySelector('.company').addEventListener('input', () => updateExperienceData(index));
            item.querySelector('.position').addEventListener('input', () => updateExperienceData(index));
            item.querySelector('.startDate').addEventListener('input', () => updateExperienceData(index));
            item.querySelector('.endDate').addEventListener('input', () => updateExperienceData(index));
            item.querySelector('.currentJob').addEventListener('change', (e) => {
                const endDateInput = e.target.closest('.end-date-group').querySelector('.endDate');
                endDateInput.disabled = e.target.checked;
                updateExperienceData(index);
            });
            item.querySelector('.description').addEventListener('input', () => updateExperienceData(index));
        });
    }

    function updateExperiencePreview() {
        const previewExperience = document.getElementById('previewExperience');
        
        previewExperience.innerHTML = '';
        
        if (cvData.experiences.length === 0) {
            previewExperience.innerHTML = '<p class="empty-notice">Henüz iş tecrübesi eklenmedi</p>';
            return;
        }
        
        cvData.experiences.forEach(exp => {
            let dateText = '';
            if (exp.startDate) {
                const startDate = new Date(exp.startDate);
                dateText = `${startDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}`;
                
                if (exp.currentJob) {
                    dateText += ' - Devam Ediyor';
                } else if (exp.endDate) {
                    const endDate = new Date(exp.endDate);
                    dateText += ` - ${endDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}`;
                }
            }
            
            const expItem = document.createElement('div');
            expItem.className = 'cv-experience-item';
            expItem.innerHTML = `
                <div class="cv-item-header">
                    <div>
                        <div class="cv-item-title">${exp.position || 'Pozisyon'}</div>
                        <div class="cv-item-subtitle">${exp.company || 'Şirket'}</div>
                    </div>
                    <div class="cv-item-date">${dateText}</div>
                </div>
                <div class="cv-item-description">${exp.description || ''}</div>
            `;
            
            previewExperience.appendChild(expItem);
        });
    }

    function addEducationItem() {
        const educationItems = document.getElementById('educationItems');
        
        const template = document.getElementById('educationTemplate');
        const newEducation = template.content.cloneNode(true);
        
        setupEducationItemEvents(newEducation);
        
        educationItems.appendChild(newEducation);
        
        cvData.education.push({
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
            currentEducation: false,
            description: ''
        });
        
        updateEducationInputs();
    }

    function setupEducationItemEvents(educationItem) {
        const index = cvData.education.length;
        
        educationItem.querySelector('.school').addEventListener('input', () => updateEducationData(index));
        educationItem.querySelector('.degree').addEventListener('input', () => updateEducationData(index));
        educationItem.querySelector('.startDate').addEventListener('input', () => updateEducationData(index));
        educationItem.querySelector('.endDate').addEventListener('input', () => updateEducationData(index));
        educationItem.querySelector('.currentEducation').addEventListener('change', (e) => {
            const endDateInput = e.target.closest('.end-date-group').querySelector('.endDate');
            endDateInput.disabled = e.target.checked;
            updateEducationData(index);
        });
        educationItem.querySelector('.description').addEventListener('input', () => updateEducationData(index));
        
        educationItem.querySelector('.remove-item').addEventListener('click', () => {
            removeEducationItem(index);
        });
    }
    
    function updateEducationData(index) {
        const educationItems = document.querySelectorAll('#educationItems .education-item');
        
        educationItems.forEach((item, i) => {
            cvData.education[i] = {
                school: item.querySelector('.school').value,
                degree: item.querySelector('.degree').value,
                startDate: item.querySelector('.startDate').value,
                endDate: item.querySelector('.endDate').value,
                currentEducation: item.querySelector('.currentEducation').checked,
                description: item.querySelector('.description').value
            };
        });
        
        updateEducationPreview();
    }

    function removeEducationItem(index) {
        cvData.education.splice(index, 1);
        
        const educationItems = document.querySelectorAll('#educationItems .education-item');
        educationItems[index].remove();
        
        updateEducationInputs();
        
        updateEducationPreview();
    }
    
    function updateEducationInputs() {
        const educationItems = document.querySelectorAll('#educationItems .education-item');
        
        educationItems.forEach((item, index) => {
            item.querySelector('.remove-item').addEventListener('click', () => {
                removeEducationItem(index);
            });
            
            item.querySelector('.school').addEventListener('input', () => updateEducationData(index));
            item.querySelector('.degree').addEventListener('input', () => updateEducationData(index));
            item.querySelector('.startDate').addEventListener('input', () => updateEducationData(index));
            item.querySelector('.endDate').addEventListener('input', () => updateEducationData(index));
            item.querySelector('.currentEducation').addEventListener('change', (e) => {
                const endDateInput = e.target.closest('.end-date-group').querySelector('.endDate');
                endDateInput.disabled = e.target.checked;
                updateEducationData(index);
            });
            item.querySelector('.description').addEventListener('input', () => updateEducationData(index));
        });
    }

    function updateEducationPreview() {
        const previewEducation = document.getElementById('previewEducation');
        
        previewEducation.innerHTML = '';
        
        if (cvData.education.length === 0) {
            previewEducation.innerHTML = '<p class="empty-notice">Henüz eğitim bilgisi eklenmedi</p>';
            return;
        }
        
        cvData.education.forEach(edu => {
            let dateText = '';
            if (edu.startDate) {
                const startDate = new Date(edu.startDate);
                dateText = `${startDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}`;
                
                if (edu.currentEducation) {
                    dateText += ' - Devam Ediyor';
                } else if (edu.endDate) {
                    const endDate = new Date(edu.endDate);
                    dateText += ` - ${endDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}`;
                }
            }
            
            const eduItem = document.createElement('div');
            eduItem.className = 'cv-education-item';
            eduItem.innerHTML = `
                <div class="cv-item-header">
                    <div>
                        <div class="cv-item-title">${edu.degree || 'Derece / Bölüm'}</div>
                        <div class="cv-item-subtitle">${edu.school || 'Okul / Üniversite'}</div>
                    </div>
                    <div class="cv-item-date">${dateText}</div>
                </div>
                <div class="cv-item-description">${edu.description || ''}</div>
            `;
            
            previewEducation.appendChild(eduItem);
        });
    }
    
    function addLanguageItem() {
        const languageItems = document.getElementById('languageItems');
        
        const template = document.getElementById('languageTemplate');
        const newLanguage = template.content.cloneNode(true);
        
        setupLanguageItemEvents(newLanguage);
        
        languageItems.appendChild(newLanguage);
        
        cvData.languages.push({
            language: '',
            proficiency: 'Orta'
        });
        
        updateLanguageInputs();
    }

    function setupLanguageItemEvents(languageItem) {
        const index = cvData.languages.length;
        
        languageItem.querySelector('.language').addEventListener('input', () => updateLanguageData(index));
        languageItem.querySelector('.proficiency').addEventListener('change', () => updateLanguageData(index));
        
        languageItem.querySelector('.remove-item').addEventListener('click', () => {
            removeLanguageItem(index);
        });
    }
    
    function updateLanguageData(index) {
        const languageItems = document.querySelectorAll('#languageItems .language-item');
        
        languageItems.forEach((item, i) => {
            cvData.languages[i] = {
                language: item.querySelector('.language').value,
                proficiency: item.querySelector('.proficiency').value
            };
        });
        
        updateLanguagePreview();
    }

    function removeLanguageItem(index) {
        cvData.languages.splice(index, 1);
        
        const languageItems = document.querySelectorAll('#languageItems .language-item');
        languageItems[index].remove();
        
        updateLanguageInputs();
        
        updateLanguagePreview();
    }
    
    function updateLanguageInputs() {
        const languageItems = document.querySelectorAll('#languageItems .language-item');
        
        languageItems.forEach((item, index) => {
            item.querySelector('.remove-item').addEventListener('click', () => {
                removeLanguageItem(index);
            });
            
            item.querySelector('.language').addEventListener('input', () => updateLanguageData(index));
            item.querySelector('.proficiency').addEventListener('change', () => updateLanguageData(index));
        });
    }

    function updateLanguagePreview() {
        const previewLanguages = document.getElementById('previewLanguages');
        const languagesSection = document.querySelector('.languages-section');
        
        previewLanguages.innerHTML = '';
        
        cvData.languages.forEach(lang => {
            if (lang.language) {
                const langItem = document.createElement('li');
                langItem.innerHTML = `
                    <span>${lang.language}</span>
                    <span>${lang.proficiency}</span>
                `;
                previewLanguages.appendChild(langItem);
            }
        });
        
        if (cvData.languages.length === 0 || previewLanguages.children.length === 0) {
            languagesSection.style.display = 'none';
        } else {
            languagesSection.style.display = 'block';
        }
    }
    
    function handleQROptions() {
        const includeQR = document.getElementById('includeQR').checked;
        const qrTypeSelect = document.getElementById('qrType');
        const qrSection = document.getElementById('previewQRSection');
        
        cvData.qr.include = includeQR;
        
        qrTypeSelect.disabled = !includeQR;
        
        if (includeQR) {
            qrSection.style.display = 'block';
            updateQRCode();
        } else {
            qrSection.style.display = 'none';
        }
    }

    function updateQRCode() {
        const qrContainer = document.getElementById('previewQR');
        qrContainer.innerHTML = '';
        
        let qrData = '';
        
        switch (cvData.qr.type) {
            case 'linkedin':
                qrData = cvData.socials.linkedin || 'https://linkedin.com';
                break;
            case 'website':
                qrData = cvData.socials.website || 'https://example.com';
                break;
            case 'contact':
                qrData = `BEGIN:VCARD
VERSION:3.0
N:${cvData.personalInfo.lastName};${cvData.personalInfo.firstName};;;
FN:${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}
TITLE:${cvData.personalInfo.title}
TEL:${cvData.personalInfo.phone}
EMAIL:${cvData.personalInfo.email}
END:VCARD`;
                break;
        }
        
        if (qrData) {
            new QRCode(qrContainer, {
                text: qrData,
                width: 100,
                height: 100,
                colorDark: cvData.primaryColor,
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        } else {
            qrContainer.innerHTML = '<p class="empty-notice">QR kodu için veri yok</p>';
        }
    }
    
    function exportAsPDF() {
        const { jsPDF } = window.jspdf;
        
        const cvElement = document.getElementById('cvDocument');
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        html2canvas(cvElement, {
            scale: 2,
            useCORS: true,
            logging: false
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            
            const canvasRatio = canvas.height / canvas.width;
            
            const imgWidth = pageWidth;
            const imgHeight = imgWidth * canvasRatio;
            
            let heightLeft = imgHeight;
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            const fileName = `${cvData.personalInfo.firstName || 'Ad'}_${cvData.personalInfo.lastName || 'Soyad'}_CV.pdf`;
            
            pdf.save(fileName);
            
            closeAllModals();
        });
    }
    
    function exportAsPNG() {
        const cvElement = document.getElementById('cvDocument');
        
        html2canvas(cvElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: null
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${cvData.personalInfo.firstName || 'Ad'}_${cvData.personalInfo.lastName || 'Soyad'}_CV.png`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            closeAllModals();
        });
    }
    
    function saveCV() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('tr-TR');
        const timeStr = now.toLocaleTimeString('tr-TR');
        
        const title = (cvData.personalInfo.firstName + ' ' + cvData.personalInfo.lastName).trim() || 'Adsız CV';
        const saveDate = `${dateStr}, ${timeStr}`;
        
        const savedCV = {
            id: Date.now().toString(),
            title: title,
            date: saveDate,
            data: JSON.stringify(cvData)
        };
        
        let savedCVs = JSON.parse(localStorage.getItem('savedCVs')) || [];
        
        savedCVs.push(savedCV);
        
        localStorage.setItem('savedCVs', JSON.stringify(savedCVs));
        localStorage.setItem('lastSavedCVId', savedCV.id);
        
        alert(`CV başarıyla kaydedildi: ${title}`);
    }
    
    function showSavedCVs() {
        const savedCVs = JSON.parse(localStorage.getItem('savedCVs')) || [];
        
        const savedCVsList = document.getElementById('savedCVsList');
        savedCVsList.innerHTML = '';
        
        if (savedCVs.length === 0) {
            savedCVsList.innerHTML = '<p>Henüz kaydedilmiş CV bulunmuyor.</p>';
        } else {
            savedCVs.forEach(cv => {
                const cvItem = document.createElement('div');
                cvItem.className = 'saved-cv-item';
                cvItem.innerHTML = `
                    <div class="saved-cv-title">${cv.title}</div>
                    <div class="saved-cv-date">${cv.date}</div>
                `;
                
                cvItem.addEventListener('click', () => {
                    loadCV(cv.id);
                    closeAllModals();
                });
                
                savedCVsList.appendChild(cvItem);
            });
        }
        
        document.getElementById('savedCVsModal').classList.add('active');
    }
        function loadCV(cvId) {
        const savedCVs = JSON.parse(localStorage.getItem('savedCVs')) || [];
        
        const cv = savedCVs.find(item => item.id === cvId);
        
        if (cv) {
            cvData = JSON.parse(cv.data);
            
            loadFormData();
            
            updateCVPreview();
            
            alert(`CV başarıyla yüklendi: ${cv.title}`);
        }
    }
    
    function loadSavedCV() {
        const lastSavedCVId = localStorage.getItem('lastSavedCVId');
        
        if (lastSavedCVId) {
            if (confirm('Son kaydedilen CV\'yi yüklemek ister misiniz?')) {
                loadCV(lastSavedCVId);
            }
        }
    }
    
    function loadFormData() {
        document.getElementById('firstName').value = cvData.personalInfo.firstName || '';
        document.getElementById('lastName').value = cvData.personalInfo.lastName || '';
        document.getElementById('title').value = cvData.personalInfo.title || '';
        document.getElementById('email').value = cvData.personalInfo.email || '';
        document.getElementById('phone').value = cvData.personalInfo.phone || '';
        document.getElementById('address').value = cvData.personalInfo.address || '';
        
        document.getElementById('profile').value = cvData.profile || '';
        
        document.getElementById('linkedin').value = cvData.socials.linkedin || '';
        document.getElementById('website').value = cvData.socials.website || '';
        document.getElementById('github').value = cvData.socials.github || '';
        
        document.getElementById('includeQR').checked = cvData.qr.include;
        document.getElementById('qrType').value = cvData.qr.type;
        document.getElementById('qrType').disabled = !cvData.qr.include;
        
        document.querySelectorAll('.template-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-template') === cvData.template) {
                item.classList.add('active');
            }
        });
        
        selectColorScheme(cvData.primaryColor);
        
        document.getElementById('fontFamily').value = cvData.fontFamily;
        
        document.getElementById('experienceItems').innerHTML = '';
        if (cvData.experiences.length > 0) {
            cvData.experiences.forEach(() => {
                addExperienceItem();
            });
            
            const experienceItems = document.querySelectorAll('#experienceItems .experience-item');
            experienceItems.forEach((item, index) => {
                const exp = cvData.experiences[index];
                item.querySelector('.company').value = exp.company || '';
                item.querySelector('.position').value = exp.position || '';
                item.querySelector('.startDate').value = exp.startDate || '';
                item.querySelector('.endDate').value = exp.endDate || '';
                item.querySelector('.currentJob').checked = exp.currentJob || false;
                item.querySelector('.description').value = exp.description || '';
            });
        }
        
        document.getElementById('educationItems').innerHTML = '';
        if (cvData.education.length > 0) {
            cvData.education.forEach(() => {
                addEducationItem();
            });
            
            const educationItems = document.querySelectorAll('#educationItems .education-item');
            educationItems.forEach((item, index) => {
                const edu = cvData.education[index];
                item.querySelector('.school').value = edu.school || '';
                item.querySelector('.degree').value = edu.degree || '';
                item.querySelector('.startDate').value = edu.startDate || '';
                item.querySelector('.endDate').value = edu.endDate || '';
                item.querySelector('.currentEducation').checked = edu.currentEducation || false;
                item.querySelector('.description').value = edu.description || '';
            });
        }
        
        document.getElementById('languageItems').innerHTML = '';
        if (cvData.languages.length > 0) {
            cvData.languages.forEach(() => {
                addLanguageItem();
            });
            
            const languageItems = document.querySelectorAll('#languageItems .language-item');
            languageItems.forEach((item, index) => {
                const lang = cvData.languages[index];
                item.querySelector('.language').value = lang.language || '';
                item.querySelector('.proficiency').value = lang.proficiency || 'Orta';
            });
        }
        
        updateSkillTags();
        
        if (cvData.personalInfo.photo) {
            const profilePhotoPreview = document.getElementById('profilePhotoPreview');
            profilePhotoPreview.innerHTML = `<img src="${cvData.personalInfo.photo}" alt="Profil Fotoğrafı">`;
            
            const cvPhoto = document.getElementById('cvPhoto');
            cvPhoto.innerHTML = `<img src="${cvData.personalInfo.photo}" alt="Profil Fotoğrafı">`;
        }
        
        const cvDocument = document.getElementById('cvDocument');
        cvDocument.classList.remove('minimal-template', 'professional-template', 'creative-template', 'modern-template');
        cvDocument.classList.add(`${cvData.template}-template`);
        
        if (cvData.qr.include) {
            updateQRCode();
            document.getElementById('previewQRSection').style.display = 'block';
        } else {
            document.getElementById('previewQRSection').style.display = 'none';
        }
    }

    function updateCVPreview() {
        updatePersonalInfoPreview();
        
        document.getElementById('previewProfile').textContent = cvData.profile || 'Kendinizi tanıtan kısa bir paragraf.';
        
        updateSkillTags();
        
        updateExperiencePreview();
        
        updateEducationPreview();
        
        updateLanguagePreview();
        
        updateSocialsPreview();
        
        if (cvData.qr.include) {
            updateQRCode();
            document.getElementById('previewQRSection').style.display = 'block';
        } else {
            document.getElementById('previewQRSection').style.display = 'none';
        }
        
        document.getElementById('cvDocument').style.fontFamily = cvData.fontFamily;
        
        const cvDocument = document.getElementById('cvDocument');
        cvDocument.classList.remove('minimal-template', 'professional-template', 'creative-template', 'modern-template');
        cvDocument.classList.add(`${cvData.template}-template`);
    }
    
});