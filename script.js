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

    if (nameMatch) chatState.facts.name = nameMatch[1];
    if (volumeMatch) chatState.facts.invoiceVolume = volumeMatch[1];
    if (industryMatch) chatState.facts.industry = industryMatch[1].trim();
  };

  const localReply = (rawText) => {
    const text = rawText.toLowerCase();
    const namePart = chatState.facts.name ? ` ${chatState.facts.name},` : '';
    if (text.includes('what do you know') || text.includes('remember')) {
      const known = [];
      if (chatState.facts.name) known.push(`your name is ${chatState.facts.name}`);
      if (chatState.facts.invoiceVolume) known.push(`you mentioned about ${chatState.facts.invoiceVolume} invoices per month`);
      if (chatState.facts.industry) known.push(`your business is in ${chatState.facts.industry}`);
      return known.length ? `So far I remember that ${known.join(', ')}.` : 'I will remember details you share, like name, invoice volume, and business type.';
    }
    if (text.includes('price') || text.includes('cost') || text.includes('pricing')) {
      const volumeNote = chatState.facts.invoiceVolume ? ` Since you mentioned around ${chatState.facts.invoiceVolume} monthly invoices, we can quote based on that workload.` : '';
      return `Pricing depends on transaction volume and reporting needs.${volumeNote} Share details on the Contact page and we can send a tailored quote.`;
    }
    if (text.includes('bookkeeping') || text.includes('reconciliation')) {
      return `We handle expense categorization, ledger cleanup, and bank/credit card reconciliations with a monthly close cadence${namePart ? namePart : '.'}`;
    }
    if (text.includes('ap') || text.includes('accounts payable') || text.includes('invoice')) {
      return 'AP is a secondary service. We can support invoice intake, approval routing, and payment batch prep after your core bookkeeping process is in place.';
    }
    if (text.includes('time') || text.includes('turnaround') || text.includes('how long')) {
      return 'Most teams are onboarded in 1-2 weeks, and invoice processing targets a 2-business-day turnaround after receipt.';
    }
    if (text.includes('contact') || text.includes('email') || text.includes('phone')) {
      return 'You can reach us through the Contact page form. We typically respond within one business day.';
    }
    return 'Thanks for your message. Our primary service is bookkeeping, and I can also help with AP support, onboarding timeline, and pricing basics. Share your details and I will use them in follow-up replies.';
  };

  const resolveAiEndpoint = () => {
    const explicit = typeof window.TRUSTED_FIN_AI_ENDPOINT === 'string' ? window.TRUSTED_FIN_AI_ENDPOINT.trim() : '';
    if (explicit) return explicit;

    const metaTag = document.querySelector('meta[name="trusted-fin-ai-endpoint"]');
    const metaEndpoint = metaTag ? String(metaTag.getAttribute('content') || '').trim() : '';
    if (metaEndpoint) return metaEndpoint;

    return null;
  };

  const aiReply = async (userText) => {
    const endpoint = resolveAiEndpoint();
    if (!endpoint) {
      throw new Error('AI endpoint not configured');
    }

  form.onsubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`AI service returned ${response.status}`);
    }

    const data = await response.json();
    if (!data || typeof data.reply !== 'string') {
      throw new Error('Invalid AI response');
    }
  };

  toggle.addEventListener('click', () => {
    if (panel.hidden) openChat();
    else closeChat();
  });
  close.addEventListener('click', closeChat);

  let hasNotifiedFallback = false;

  chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    appendMessage(value, 'user');
    pushHistory('user', value);
    extractFacts(value);
    input.value = '';
    setSending(true);

    try {
      const aiText = await aiReply(value);
      const response = aiText || localReply(value);
      appendMessage(response, 'bot');
      pushHistory('assistant', response);
    } catch (error) {
      const response = localReply(value);
      if (!hasNotifiedFallback) {
        const issue = error instanceof Error ? error.message : 'Unknown error';
        const notice = issue === 'AI endpoint not configured'
          ? 'Heads up: live AI is not configured on this site yet, so you are seeing backup replies.'
          : issue.includes('405')
            ? 'Heads up: live AI endpoint rejected chat requests (HTTP 405), so you are seeing backup replies.'
            : 'Heads up: live AI is currently unavailable, so you are seeing backup replies. Please try again later or contact us directly.';
        appendMessage(notice, 'bot');
        pushHistory('assistant', notice);
        hasNotifiedFallback = true;
      }
      appendMessage(response, 'bot');
      pushHistory('assistant', response);
    } finally {
      setSending(false);
      input.focus();
    }
  });


  const shouldAutoOpen = (() => {
    try {
      return !window.sessionStorage.getItem(hasDismissedKey);
    } catch (error) {
      return true;
    }
  })();

  if (shouldAutoOpen) {
    setTimeout(openChat, 600);
  }

  appendMessage("Hi! I'm the Trusted Financial Records assistant. I can remember what you share and answer follow-up questions.", 'bot');
})();
