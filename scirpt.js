document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Project Data Fetching and Display ---
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        fetch('projects.json')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(projects => {
                projectsContainer.innerHTML = '';
                if (projects.length === 0) {
                    projectsContainer.innerHTML = '<p>No projects to display yet.</p>';
                    return;
                }
                projects.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('project-card');
                    projectCard.innerHTML = `
                        <img src="${project.imageUrl}" alt="${project.title}">
                        <div class="project-card-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <a href="${project.projectUrl}" target="_blank" rel="noopener noreferrer">View Project</a>
                        </div>
                    `;
                    projectsContainer.appendChild(projectCard);
                });
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                projectsContainer.innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
            });
    }

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            formMessages.innerHTML = '';
            document.querySelectorAll('.error-message').forEach(el => el.innerHTML = '');

            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Validate Name
            if (name === '') {
                document.getElementById('name-error').textContent = 'Name is required';
                isValid = false;
            }

            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                document.getElementById('email-error').textContent = 'Email is required';
                isValid = false;
            } else if (!emailPattern.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter your email address';
                isValid = false;
            }

            // Validate Message
            if (message === '') {
                document.getElementById('message-error').textContent = 'Message is required';
                isValid = false;
            }

            if (isValid) {
                formMessages.classList.remove('error');
                formMessages.classList.add('success');
                formMessages.textContent = 'sucessfully';
                contactForm.reset();
            } else {
                formMessages.classList.remove('success');
                formMessages.classList.add('error');
                formMessages.textContent = 'transection failed';
            }
        });
    }
});