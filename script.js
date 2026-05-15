(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');
  const contactEmail = 'info@trustedfinr.com';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get('website')) {
      status.textContent = 'Submission blocked.';
      return;
    }
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      status.textContent = 'Please fill out all required fields.';
      return;
    }

    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const service = String(data.get('service') || 'General consultation').trim();
    const appointmentDateTime = String(data.get('appointmentDateTime') || '').trim();
    const appointmentText = appointmentDateTime
      ? new Date(appointmentDateTime).toLocaleString()
      : 'Not provided';
    const message = String(data.get('message')).trim();
    const subject = encodeURIComponent(`Contact form inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\nRequested appointment: ${appointmentText}\n\nMessage:\n${message}`);

    status.textContent = `Opening your email app to send this message to ${contactEmail}.`;
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    form.reset();
  });
})();

(() => {
  const wrap = document.getElementById('testimonialCards');
  if (!wrap) return;

  const testimonials = [
    { quote: '“Their team helped us finally get organized and stay ahead of reporting deadlines every month.”', author: '— Retail Business Owner' },
    { quote: '“We now understand our numbers clearly and can plan growth without guessing.”', author: '— Marketing Agency Founder' },
    { quote: '“Responsive, detail-oriented, and proactive. Their support has been a major relief for our team.”', author: '— Local Services Company' },
    { quote: '“The monthly reporting is clean, timely, and easy to share with our leadership team.”', author: '— Operations Director, Healthcare' },
    { quote: '“They fixed years of bookkeeping issues and built a process we can actually rely on.”', author: '— E-commerce Business Owner' },
    { quote: '“Tax season is finally manageable. We stay compliant without the stress we used to have.”', author: '— Construction Firm Partner' }
  ];

  const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

  const renderCards = () => {
    const selected = shuffle(testimonials).slice(0, 4);
    wrap.innerHTML = selected.map((item) => `
      <article class="card testimonial-card">
        <p>${item.quote}</p>
        <cite>${item.author}</cite>
      </article>
    `).join('');
  };

  renderCards();
  setInterval(renderCards, 8000);
})();

(() => {
  const existingWidget = document.getElementById('chatWidget');
  if (existingWidget) return;

  const widget = document.createElement('section');
  widget.className = 'chat-widget';
  widget.id = 'chatWidget';
  widget.setAttribute('aria-label', 'Chat support assistant');

  widget.innerHTML = `
    <button id="chat-launcher" aria-expanded="false" aria-controls="chat-window">💬</button>
    <div id="chat-window" hidden>
      <div class="chat-header">Trusted Financial Records Support</div>
      <div class="chat-content">
        <div class="bot-msg" id="chatGreeting"></div>
        <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" id="appointment-form">
          <label for="clientName">Full Name</label>
          <input id="clientName" type="text" name="name" placeholder="John Doe" required>

          <label for="contact">Email or Phone</label>
          <input id="contact" type="text" name="contact" placeholder="email@example.com" required>

          <label for="appointmentDateTime">Preferred Appointment Date & Time</label>
          <input id="appointmentDateTime" type="datetime-local" name="appointment_datetime" required>

          <label for="request">Briefly describe your request</label>
          <input id="request" type="text" name="message" placeholder="QuickBooks help, Tax prep, etc.">

          <button type="submit">Book Appointment</button>
        </form>

        <div id="confirmation" class="hidden bot-msg success-msg">
          Perfect! Your appointment is all set.
          A confirmation message has been sent to the contact information you provided.
          We have also forwarded these details to our internal team so we can prepare for our meeting.
          Is there anything else I can assist you with in the meantime?
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(widget);

  const launcher = document.getElementById('chat-launcher');
  const chatWindow = document.getElementById('chat-window');
  const greeting = document.getElementById('chatGreeting');
  const form = document.getElementById('appointment-form');
  const confirmation = document.getElementById('confirmation');

  greeting.textContent = "Hello! Welcome to Trusted Financial Records. I'm your digital assistant. How can I help you with your accounting or financial records today? I’d love to get you the right support. May I start by getting your full name and the best phone number or email address to reach you at?";

  launcher.addEventListener('click', () => {
    const isOpen = !chatWindow.hidden;
    chatWindow.hidden = isOpen;
    launcher.setAttribute('aria-expanded', String(!isOpen));
  });

  form.onsubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      form.classList.add('hidden');
      confirmation.classList.remove('hidden');
    } else {
      window.alert('Oops! There was a problem submitting your request.');
    }
  };
})();
