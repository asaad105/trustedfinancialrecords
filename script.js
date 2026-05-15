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
    <button class="chat-toggle" id="chatToggle" aria-expanded="false" aria-controls="chatPanel">Chat with us</button>
    <div class="chat-panel" id="chatPanel" hidden>
      <header class="chat-header">
        <h2>Finance Assistant</h2>
        <button class="chat-close" id="chatClose" aria-label="Close chat">×</button>
      </header>
      <div class="chat-messages" id="chatMessages" role="log" aria-live="polite"></div>
      <form class="chat-form" id="chatForm">
        <label class="sr-only" for="chatInput">Type your message</label>
        <input id="chatInput" name="chatInput" type="text" placeholder="Ask about services, pricing, or timelines..." required />
        <button type="submit">Send</button>
      </form>
    </div>
  `;

  document.body.appendChild(widget);

  const toggle = document.getElementById('chatToggle');
  const close = document.getElementById('chatClose');
  const panel = document.getElementById('chatPanel');
  const messages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');

  const appendMessage = (text, role) => {
    const item = document.createElement('p');
    item.className = `chat-message chat-message-${role}`;
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  };

  const botReply = (rawText) => {
    const text = rawText.toLowerCase();
    if (text.includes('price') || text.includes('cost') || text.includes('pricing')) {
      return 'Pricing depends on transaction volume and reporting needs. Share your monthly invoice count on the Contact page and we can send a tailored quote.';
    }
    if (text.includes('bookkeeping') || text.includes('reconciliation')) {
      return 'We handle expense categorization, ledger cleanup, and bank/credit card reconciliations with a monthly close cadence.';
    }
    if (text.includes('ap') || text.includes('accounts payable') || text.includes('invoice')) {
      return 'Our AP support includes invoice intake, approval routing, and payment batch prep with clear approval checkpoints.';
    }
    if (text.includes('time') || text.includes('turnaround') || text.includes('how long')) {
      return 'Most teams are onboarded in 1-2 weeks, and invoice processing targets a 2-business-day turnaround after receipt.';
    }
    if (text.includes('contact') || text.includes('email') || text.includes('phone')) {
      return 'You can reach us through the Contact page form. We typically respond within one business day.';
    }
    return 'Thanks for your message. I can help with AP support, bookkeeping, onboarding timeline, and pricing basics. If you share details, I can guide you to the next step.';
  };

  const openChat = () => {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    input.focus();
  };

  const closeChat = () => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  };

  toggle.addEventListener('click', () => {
    if (panel.hidden) openChat();
    else closeChat();
  });
  close.addEventListener('click', closeChat);

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    appendMessage(value, 'user');
    const response = botReply(value);
    window.setTimeout(() => appendMessage(response, 'bot'), 250);
    input.value = '';
  });

  appendMessage('Hi! I\'m the Trusted Financial Records assistant. Ask me about AP, bookkeeping, timelines, or pricing.', 'bot');
})();
