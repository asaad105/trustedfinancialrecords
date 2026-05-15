(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');
  const calendlyUrl = 'https://calendly.com/trustedfinancialofficial/30min';

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
    const calendlyPrefill = new URLSearchParams({
      name,
      email,
      a1: service,
      a2: appointmentText,
      a3: message
    });

    status.textContent = 'Redirecting you to Calendly to choose your appointment time.';
    window.location.href = `${calendlyUrl}?${calendlyPrefill.toString()}`;
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
  if (document.getElementById('chat-trigger') || document.getElementById('chat-box')) return;

  const calendlyEmbedUrl = 'https://calendly.com/trustedfinancialofficial/30min?hide_event_type_details=1&hide_gdpr_banner=1';

  const loadCalendlyScript = () => new Promise((resolve) => {
    if (window.Calendly?.initInlineWidget) {
      resolve(true);
      return;
    }

    const existing = document.querySelector('script[data-calendly-widget="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true), { once: true });
      existing.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    const calendlyScript = document.createElement('script');
    calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
    calendlyScript.async = true;
    calendlyScript.dataset.calendlyWidget = 'true';
    calendlyScript.addEventListener('load', () => resolve(true), { once: true });
    calendlyScript.addEventListener('error', () => resolve(false), { once: true });
    document.head.appendChild(calendlyScript);
  });

  const trigger = document.createElement('button');
  trigger.id = 'chat-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', 'Open chat assistant');
  trigger.textContent = '💬';

  const box = document.createElement('div');
  box.id = 'chat-box';
  box.innerHTML = `
    <div class="header">
      <h3>Trusted Financial Records Support</h3>
      <small>Online Assistant</small>
    </div>
    <div id="chat-history"></div>
    <div class="input-group">
      <input type="text" id="user-input" placeholder="Type a message..." aria-label="Type a message" />
      <button id="send-btn" type="button">Send</button>
    </div>
  `;

  document.body.append(trigger, box);

  let currentStep = 1;

  const history = box.querySelector('#chat-history');
  const input = box.querySelector('#user-input');
  const sendButton = box.querySelector('#send-btn');

  const addMessage = (text, sender) => {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    history.appendChild(div);
    history.scrollTop = history.scrollHeight;
  };

  const startConversation = () => {
    setTimeout(() => {
      addMessage('Hi! I am the Trusted Financial Records assistant.', 'bot');
      setTimeout(() => {
        addMessage('How can I assist you with your bookkeeping today?', 'bot');
        currentStep = 2;
      }, 600);
    }, 300);
  };

  const showCalendlyEmbed = async () => {
    if (history.querySelector('.calendar-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'calendar-wrapper';

    const bookingLink = document.createElement('a');
    bookingLink.href = calendlyEmbedUrl;
    bookingLink.target = '_blank';
    bookingLink.rel = 'noopener noreferrer';
    bookingLink.className = 'calendar-link';
    bookingLink.textContent = 'Open appointment calendar in a new tab';

    history.appendChild(wrapper);
    history.appendChild(bookingLink);
    history.scrollTop = history.scrollHeight;

    const loaded = await loadCalendlyScript();

    if (loaded && window.Calendly?.initInlineWidget) {
      window.Calendly.initInlineWidget({
        url: calendlyEmbedUrl,
        parentElement: wrapper
      });
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.src = calendlyEmbedUrl;
    iframe.title = 'Book an appointment';
    iframe.loading = 'lazy';
    wrapper.appendChild(iframe);
  };

  const selectChoice = (choice) => {
    const containers = history.querySelectorAll('.btn-container');
    if (containers.length > 0) containers[containers.length - 1].remove();

    if (choice === 'yes') {
      addMessage('Yes, please.', 'user');
      setTimeout(() => {
        addMessage('Wonderful. Please use our live calendar below to view our open availability and pick a time slot that suits you best.', 'bot');
        void showCalendlyEmbed();
      }, 400);
    } else {
      addMessage('No, thank you.', 'user');
      setTimeout(() => {
        addMessage('No problem at all! Wishing you the best of luck with your endeavors. Please let me know if there is anything else I can help you find.', 'bot');
        currentStep = 4;
      }, 400);
    }
  };

  const showBookingChoices = () => {
    const container = document.createElement('div');
    container.className = 'btn-container';

    const yesButton = document.createElement('button');
    yesButton.className = 'choice-btn';
    yesButton.type = 'button';
    yesButton.textContent = 'Yes, please';
    yesButton.addEventListener('click', () => selectChoice('yes'));

    const noButton = document.createElement('button');
    noButton.className = 'choice-btn';
    noButton.type = 'button';
    noButton.textContent = 'No, thank you';
    noButton.addEventListener('click', () => selectChoice('no'));

    container.append(yesButton, noButton);
    history.appendChild(container);
    history.scrollTop = history.scrollHeight;
  };

  const handleConversationFlow = (userText) => {
    if (currentStep === 2) {
      addMessage('Thank you for sharing that with me. Would you like to schedule a brief appointment with us to look into this together?', 'bot');
      showBookingChoices();
      currentStep = 3;
    } else if (currentStep === 3) {
      const lower = userText.toLowerCase();
      if (lower.includes('yes') || lower.includes('sure') || lower.includes('book')) {
        selectChoice('yes');
      } else {
        selectChoice('no');
      }
    } else {
      addMessage('Is there anything else I can assist you with today?', 'bot');
      showBookingChoices();
      currentStep = 3;
    }
  };

  const processTextSubmit = () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    setTimeout(() => handleConversationFlow(text), 600);
  };

  const toggleChat = () => {
    const isOpening = box.style.display === 'none' || box.style.display === '';
    box.style.display = isOpening ? 'flex' : 'none';

    if (isOpening && history.children.length === 0) startConversation();
  };

  trigger.addEventListener('click', toggleChat);
  sendButton.addEventListener('click', processTextSubmit);
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') processTextSubmit();
  });
})();

