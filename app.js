// app.js - cleaned and fixed for receipts + checkout flows

// ======== Config & Data ========
const DELIVERY_FEE = 49;
const TAX_RATE = 0.05;

const PRODUCTS = [
  { id: 'cake_truf', name: 'Chocolate Truffle Cake', price: 749, category: 'Cakes', img: 'assets/products/cake1.jpg', popular: false },
  { id: 'cake_rv', name: 'Red Velvet Cake', price: 799, category: 'Cakes', img: 'assets/products/cake2.jpg', popular: false },
  { id: 'cake_bo', name: 'Blue Ombre Cake', price: 900, category: 'Cakes', img: 'assets/products/blue.jpg', popular: true },
  { id: 'cake_bf', name: 'Black Forest Cake', price: 699, category: 'Cakes', img: 'assets/products/cake3.jpg', popular: false },
  { id: 'cake_ro', name: 'Rose Cake', price: 799, category: 'Cakes', img: 'assets/products/cake5.jpg', popular: false },
  { id: 'cake_gl', name: 'Glazed Cake', price: 759, category: 'Cakes', img: 'assets/products/cake6.jpg', popular: false },
  { id: 'cake_ra', name: 'Rainbow Cake', price: 689, category: 'Cakes', img: 'assets/products/rain.jpg', popular: false },
  { id: 'cake_chs', name: 'Baked Cheesecake', price: 699, category: 'Cakes', img: 'assets/products/cake4.jpg', popular: true },
  { id: 'cc_cc', name: 'Choco Chip Cupcake', price: 119, category: 'Cupcakes', img: 'assets/products/cupcake1.jpg', popular: false },
  { id: 'cc_va', name: 'Vanilla Cream Cupcake', price: 109, category: 'Cupcakes', img: 'assets/products/cupcake2.jpg', popular: false },
  { id: 'cc_rv', name: 'Red Velvet Cupcake', price: 129, category: 'Cupcakes', img: 'assets/products/cupcake3.jpg', popular: false },
  { id: 'rc_rv', name: 'Rich choco Cupcake', price: 129, category: 'Cupcakes', img: 'assets/products/choccup.jpg', popular: true },
  { id: 'pas_tir', name: 'Tiramisu Slice', price: 149, category: 'Pastries', img: 'assets/products/tira.jpg', popular: true },
  { id: 'pas_op', name: 'Opera Pastry', price: 159, category: 'Pastries', img: 'assets/products/pastry2.jpg', popular: true },
  { id: 'pas_carm', name: 'Caramel Delight', price: 139, category: 'Pastries', img: 'assets/products/pastry3.jpg', popular: false },
  { id: 'fru_pas', name: 'Fruit pastry', price: 149, category: 'Pastries', img: 'assets/products/pastry1.jpg', popular: false },
  { id: '201', name: "Chocolate Jar Cake", category: "Jar Cakes", price: 180, img: 'assets/products/chocojar.jpg', popular: false },
  { id: '202', name: "Red Velvet Jar Cake", category: "Jar Cakes", price: 200, img: 'assets/products/redvelvet.jpg', popular: true },
  { id: '203', name: "Blueberry Jar Cake", category: "Jar Cakes", price: 190, img: 'assets/products/jar3.jpg', popular: false },
  { id: '205', name: "Mango Jar Cake", category: "Jar Cakes", price: 170, img: 'assets/products/mangojar.jpg', popular: false },
  { id: 'ck_cc', name: 'Choco Chip Cookies (6)', price: 159, category: 'Cookies', img: 'assets/products/cookies.jpg', popular: true },
  { id: 'ck_bt', name: 'Butter Cookies (6)', price: 149, category: 'Cookies', img: 'assets/products/cookie2.jpg', popular: false },
  { id: 'ck_mt', name: 'Monster Cookies (2)', price: 149, category: 'Cookies', img: 'assets/products/cookie4.jpg', popular: false },
  { id: 'ck_oat', name: 'Oatmeal Cookies (6)', price: 149, category: 'Cookies', img: 'assets/products/cookie3.jpg', popular: false },
  { id: 'br_cr', name: 'Croissant', price: 89, category: 'Breads', img: 'assets/products/bread1.jpg', popular: false },
  { id: 'br_gb', name: 'Garlic Bread', price: 129, category: 'Breads', img: 'assets/products/bread2.jpg', popular: false },
  { id: 'br_sgb', name: 'Special Garlic Bread', price: 159, category: 'Breads', img: 'assets/products/bread4.jpg', popular: false },
  { id: 'br_bg', name: 'Bagel', price: 99, category: 'Breads', img: 'assets/products/bread3.jpg', popular: false },
  { id: 'brw_fd', name: 'Fudge Brownie', price: 139, category: 'Brownies', img: 'assets/products/fudge brownies.jpg', popular: true },
  { id: 'tri_fd', name: 'Triple choco Brownie', price: 149, category: 'Brownies', img: 'assets/products/fudge2.jpg', popular: false },
  { id: 'coc_fd', name: 'Coconut Brownie', price: 149, category: 'Brownies', img: 'assets/products/fudge3.jpg', popular: false },
  { id: 'car_fd', name: 'Caramel Brownie', price: 139, category: 'Brownies', img: 'assets/products/fudge4.jpg', popular: false },
  { id: 'mf_bb', name: 'Blueberry Muffin', price: 119, category: 'Others', img: 'assets/products/muffins.jpg', popular: false },
  { id: 'mc_mc', name: 'Macaroons', price: 300, category: 'Others', img: 'assets/products/macaroons.jpg', popular: true },
  { id: 'fr_pi', name: 'Fruit Pie', price: 350, category: 'Others', img: 'assets/products/pie.jpg', popular: true },
  { id: 'pi_pi', name: 'Pie', price: 300, category: 'Others', img: 'assets/products/app.jpg', popular: false },
];

// ======== Enable Live Search & Filters ========
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = $('#search');
  const categorySelect = $('#category');
  const sortSelect = $('#sort');

  if (searchInput) searchInput.addEventListener('input', renderMenu);
  if (categorySelect) categorySelect.addEventListener('change', renderMenu);
  if (sortSelect) sortSelect.addEventListener('change', renderMenu);
});


// ======== Utilities ========
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];
const currency = n => '₹' + (typeof n === 'number' ? n.toFixed(0) : n);

// Lightweight localStorage wrapper
const storage = {
  get(key,fallback){ try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; }catch{return fallback;} },
  set(key,value){ localStorage.setItem(key, JSON.stringify(value)); }
};

// Cart helpers
function getCart(){ return storage.get('cart', []); }
function saveCart(items){ storage.set('cart', items); updateCartBadge(); }
function updateCartBadge(){
  const count = getCart().reduce((a,i)=>a+i.qty, 0);
  $$('#cartCount').forEach(el=>el.textContent=count);
}
function addToCart(productId, qty=1){
  const product = PRODUCTS.find(p=>p.id===productId);
  if(!product) return;
  const cart = getCart();
  const existing = cart.find(i=>i.id===productId);
  if(existing){ existing.qty += qty; } 
  else cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty });
  saveCart(cart); renderCart();
}
function updateQty(productId,newQty){
  const cart = getCart(); 
  const item = cart.find(i=>i.id===productId);
  if(!item) return;
  item.qty = Math.max(1, isNaN(newQty) ? item.qty : newQty);
  saveCart(cart); renderCart(); renderSummary();
}
function removeFromCart(productId){
  const cart = getCart().filter(i=>i.id!==productId);
  saveCart(cart); renderCart(); renderSummary();
}
function clearCart(){ saveCart([]); renderCart(); renderSummary(); }

function totals(){
  const items = getCart();
  const subtotal = items.reduce((a,i)=>a+i.price*i.qty,0);
  const tax = subtotal * TAX_RATE;
  const delivery = items.length ? DELIVERY_FEE : 0;
  const discountPct = parseInt(localStorage.getItem('discount') || '0', 10) || 0;
  const discountAmt = discountPct ? subtotal * (discountPct / 100) : 0;
  const total = subtotal + tax + delivery - discountAmt;
  return { subtotal, tax, delivery, discount: discountAmt, total };
}

// ===== Drawer (Cart) rendering =====
function openDrawer(){ $('#cartDrawer')?.classList.add('open'); }
function closeDrawer(){ $('#cartDrawer')?.classList.remove('open'); }

function renderCart() {
  const wrap = $('#cartItems'); if (!wrap) return;
  const items = getCart();

  if (items.length === 0) {
    wrap.innerHTML = '<p class="muted">Your cart is empty. Add something delicious!</p>';
  } else {
    wrap.innerHTML = items.map(i => `
      <div class="cart-item">
        <img src="${i.img}" alt="${i.name}">
        <div>
          <div class="name">${i.name}</div>
          <div class="muted">x ${i.qty} • ${currency(i.price)}</div>
          <div class="qty">
            <button onclick="updateQty('${i.id}', ${i.qty - 1})">-</button>
            <input value="${i.qty}" oninput="updateQty('${i.id}', parseInt(this.value||'1'))">
            <button onclick="updateQty('${i.id}', ${i.qty + 1})">+</button>
          </div>
        </div>
        <button class="remove" onclick="removeFromCart('${i.id}')">✕</button>
      </div>
    `).join('');
  }

  // Totals
  const t = totals();
  $('#cartSubtotal') && ($('#cartSubtotal').textContent = currency(t.subtotal));
  $('#cartTax') && ($('#cartTax').textContent = currency(t.tax));
  $('#cartDiscount')?.remove();
  if (t.discount) {
    $('#cartDelivery')?.insertAdjacentHTML("beforebegin",
      `<div class="row small" id="cartDiscount"><span>Discount</span><span>- ${currency(t.discount)}</span></div>`
    );
  }
  $('#cartDelivery') && ($('#cartDelivery').textContent = currency(t.delivery));
  $('#cartTotal') && ($('#cartTotal').textContent = currency(t.total));

  // Checkout button
  const checkoutBtn = document.querySelector("#checkoutBtn");
  if (checkoutBtn) {
    if (items.length === 0) {
      checkoutBtn.disabled = true;
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.onclick = () => window.location.href = "checkout.html";
    }
  }
}

// ======== Summary (Checkout page) ========
function renderSummary(){
  const wrap = $('#orderItems'); if(!wrap) return;
  const items = getCart();
  wrap.innerHTML = items.map(i=>`<div class="row"><span>${i.name} × ${i.qty}</span><strong>${currency(i.price*i.qty)}</strong></div>`).join('')||'<p class="muted">No items yet.</p>';
  const t = totals();
  $('#sumSubtotal') && ($('#sumSubtotal').textContent = currency(t.subtotal));
  $('#sumTax') && ($('#sumTax').textContent = currency(t.tax));
  $('#sumDiscount')?.remove();
  if(t.discount){
    $('#sumDelivery')?.insertAdjacentHTML("beforebegin", `<div class="row" id="sumDiscount"><span>Discount</span><strong>- ${currency(t.discount)}</strong></div>`);
  }
  $('#sumDelivery') && ($('#sumDelivery').textContent = currency(t.delivery));
  $('#sumTotal') && ($('#sumTotal').textContent = currency(t.total));
}

// ======== Menu rendering ========
function renderMenu(){
  const grid = $('#products'); if(!grid) return;
  const q = $('#search')?.value.toLowerCase()||"";
  const cat = $('#category')?.value||"All";
  const sort = $('#sort')?.value||"popular";

  let list = PRODUCTS.filter(p=>(cat==='All'||p.category===cat)&&(p.name.toLowerCase().includes(q)));

  if(sort==='price-asc') list.sort((a,b)=>a.price-b.price);
  else if(sort==='price-desc') list.sort((a,b)=>b.price-a.price);
  else if(sort==='name-asc') list.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sort==='name-desc') list.sort((a,b)=>b.name.localeCompare(a.name));
  else if(sort==='popular') list.sort((a,b)=> (b.popular|0)-(a.popular|0));

  grid.innerHTML = list.map(p => `
  <article class="menu-item" id="${p.id}">
    <img src="${p.img}" alt="${p.name}" loading="lazy">
    <div class="menu-item-content">
      <h3>${p.name}</h3>
      <p>${p.category}</p>
      <span class="price">${currency(p.price)}</span>
      <button onclick="addToCart('${p.id}',1)" class="btn btn--primary">Add to Cart</button>
    </div>
  </article>
`).join('');
}

function populateFilters(){
  const sel = $('#category'); if(!sel) return;
  const cats = ['All', ...new Set(PRODUCTS.map(p=>p.category))];
  sel.innerHTML = cats.map(c=>`<option value="${c}">${c}</option>`).join('');
}

// ======== Save order helper ========
function saveOrder(order) {
  // push full order object to localStorage array
  const orders = storage.get('orders', []);
  orders.push(order);
  storage.set('orders', orders);
}

// ======== Modals & Receipt generation ========
function showModal(id){ document.getElementById(id)?.classList.remove("hidden"); }
function closeModal(id){ document.getElementById(id)?.classList.add("hidden"); }

async function generateReceiptPDF(formData, order) {
  // ensure jsPDF is present
  if (!window.jspdf || !window.jspdf.jsPDF) {
    console.error('jsPDF is not loaded. Include jsPDF script before app.js.');
    alert('Receipt generation failed: missing jsPDF library.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const now = new Date();

  const orderId = order.orderId;
  const items = order.items || [];
  const t = order.totals || totals();

  // Header
  doc.setFont('helvetica','bold');
  doc.setFontSize(20);
  doc.text('SweetCrumb',14,18);
  doc.setFontSize(11);
  doc.setFont('helvetica','normal');
  doc.text('GSTIN: 29ABCDE1234F2Z5',14,26);
  doc.text('221B Baker Street, Bengaluru • +91-90000-12345',14,32);

  doc.setFontSize(10);
  doc.text(`Order ID: ${orderId}`,150,18);
  doc.text(`Date: ${now.toLocaleString()}`,150,26,{align:'left'});

  // Customer details
  let y = 42;
  doc.setFont('helvetica','bold'); doc.text('Bill To:',14,y);
  doc.setFont('helvetica','normal');
  y += 6;
  doc.text(`${formData.name || ''}`,14,y); y+=6;
  doc.text(`${formData.phone || ''} • ${formData.email || ''}`,14,y); y+=6;
  doc.text(`${formData.address || ''}`,14,y); y+=8;

  // Items header
  doc.setFont('helvetica','bold');
  doc.text('Item',14,y);
  doc.text('Qty',120,y);
  doc.text('Price',150,y);
  y += 4;
  doc.line(14,y,196,y);
  y += 6;

  doc.setFont('helvetica','normal');
  items.forEach(it => {
    // wrap if y gets near page end
    if (y > 260) { doc.addPage(); y = 20; }
    doc.text(it.name,14,y);
    doc.text(String(it.qty),120,y);
    doc.text(currency(it.price * it.qty),150,y);
    y += 8;
  });

  y += 2;
  doc.line(14,y,196,y);
  y += 8;

  doc.text('Subtotal',120,y); doc.text(currency(t.subtotal||0),150,y); y+=6;
  doc.text('GST (5%)',120,y); doc.text(currency(t.tax||0),150,y); y+=6;
  doc.text('Delivery',120,y); doc.text(currency(t.delivery||0),150,y); y+=6;
  if(t.discount){ doc.text('Discount',120,y); doc.text('-'+currency(t.discount),150,y); y+=6; }
  doc.setFont('helvetica','bold'); doc.text('Grand Total',120,y); doc.text(currency(t.total||0),150,y); y+=10;

  doc.setFont('helvetica','normal'); doc.setFontSize(10);
  doc.text('Payment: ' + (formData.payment || '') + ' • Slot: ' + (formData.slot || ''),14,y); y+=6;
  if(formData.notes){ doc.text('Notes: '+formData.notes,14,y); y+=6; }

  y += 8;
  doc.setFontSize(9);
  doc.text('Thank you for choosing SweetCrumb! This is a computer-generated receipt.',14,y);

  // Save file (download)
  try {
    doc.save(`SweetCrumb_Receipt_${orderId}.pdf`);
  } catch (err) {
    console.error('PDF save failed', err);
    alert('Failed to save receipt PDF. See console for details.');
  }
}


  // ======== Tracking page rendering (using saved orders, fixed) ========
document.addEventListener('DOMContentLoaded', () => {
  const trackBtn = document.getElementById('trackBtn');
  const orderIdInput = document.getElementById('orderIdInput');
  const trackResult = document.getElementById('trackResult');
  const trackFormWrapper = document.getElementById('trackFormWrapper');

  if (trackBtn && orderIdInput && trackResult && trackFormWrapper) {
    const orders = storage.get('orders', []);
    if (!orders || orders.length === 0) {
      trackFormWrapper.innerHTML = "<p>You haven’t placed any orders yet.</p>";
    } else {
      orderIdInput.value = orders[orders.length - 1].orderId;
    }

    trackBtn.addEventListener('click', () => {
      const orderId = orderIdInput.value.trim();
      const orders = storage.get('orders', []);
      const order = (orders || []).find(o => o.orderId === orderId);

      // clear previous output before adding new
      trackResult.innerHTML = "";

      if (!order) {
        trackResult.innerHTML = "<p>Order not found. Please check your Order ID.</p>";
        return;
      }

      const statuses = ['Order Placed', 'Getting Packed', 'Out for Delivery', 'Delivered'];
      const savedStatus = storage.get('status_' + orderId, order.status);
      let statusIndex = statuses.indexOf(savedStatus);
      if (statusIndex === -1) statusIndex = 0;

      // build UI
      trackResult.innerHTML = `
        <h3>Order ${order.orderId}</h3>
        <p>Placed on: ${new Date(order.date).toLocaleString()}</p>
        <p><strong>Customer:</strong> ${order.name || ''} • ${order.phone || ''}</p>
        <ul class="order-items">
          ${order.items.map(i => `<li>${i.name} × ${i.qty}</li>`).join('')}
        </ul>
        <p>ETA: approx. 45–60 mins</p>
        <div class="tracking-bar">
          <div class="progress-line" style="width: ${(statusIndex / (statuses.length - 1)) * 100}%"></div>
          ${statuses.map((s, i) =>
            `<div class="tracking-step ${i <= statusIndex ? 'completed' : ''}"><span>${s}</span></div>`
          ).join('')}
        </div>
      `;

      const steps = trackResult.querySelectorAll('.tracking-step');
      const progressLine = trackResult.querySelector('.progress-line');

      // ✅ already delivered → show instantly
      if (savedStatus === 'Delivered') {
        steps.forEach(step => step.classList.add('completed'));
        if (progressLine) progressLine.style.width = '100%';
        const deliveredBadge = document.createElement('div');
        deliveredBadge.className = "delivered-badge";
        deliveredBadge.innerHTML = `🎂 <strong>Delivered Fresh!</strong> on ${new Date(order.date).toLocaleDateString()}`;
        trackResult.appendChild(deliveredBadge);
        return;
      }

      // 🕒 simulate progress (once per new order)
      let currentStep = statusIndex + 1;
      const totalSteps = steps.length;

      const interval = setInterval(() => {
        if (currentStep >= totalSteps) {
          clearInterval(interval);
          alert(`🎉 Order Delivered Successfully! Thank you for placing the order.`);
          order.status = 'Delivered';
          storage.set('orders', orders);
          storage.set('status_' + orderId, 'Delivered');
          return;
        }
        steps.forEach((step, i) => {
          step.classList.remove('current', 'completed');
          if (i < currentStep) step.classList.add('completed');
          else if (i === currentStep) step.classList.add('current');
        });
        const progress = (currentStep / (totalSteps - 1)) * 100;
        if (progressLine) progressLine.style.width = progress + '%';
        currentStep++;
      }, 4000);
    });
  }

  // init shared UI
  bindCommon();
  populateFilters();
  renderMenu();
  initCheckout();
  initQuizGame();
  initSlideshow();
});



// ======== Checkout initialization (fixed) ========
function initCheckout() {
  const form = $('#checkoutForm'); if (!form) return;
  renderSummary();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (getCart().length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const now = new Date();
    const orderId = 'SC' + now.getTime().toString().slice(-7);

    const finalizeOrder = () => {
      setTimeout(() => {
        alert(`✅ Your order ${orderId} has been placed! You can track it now.`);
        clearCart();
        window.location.href = 'track-order.html';
      }, 100);
    };

    // COD
    if (data.payment === "COD") {
      const otp = Math.floor(1000 + Math.random() * 9000);
      localStorage.setItem("codOtp", otp);
      alert(`(Simulated SMS) OTP ${otp} sent to ${data.phone}`);
      showModal("otpModal");

      const otpBtn = document.querySelector("#verifyOtpBtn");
      if (otpBtn) {
        otpBtn.replaceWith(otpBtn.cloneNode(true));
        document.querySelector("#verifyOtpBtn").onclick = () => {
          const entered = document.querySelector("#otpInput").value.trim();
          if (entered === otp.toString()) {
            closeModal("otpModal");
            const order = { orderId, date: now.toISOString(), items: getCart(), totals: totals(), status: "Order Placed", ...data };
            saveOrder(order);
            generateReceiptPDF(data, order);
            finalizeOrder();
          } else {
            alert("Invalid OTP, try again.");
          }
        };
      } else {
        alert('OTP modal not found.');
      }
    }

    // UPI
    else if (data.payment === "UPI") {
      showModal("upiModal");
      document.querySelector("#upiQR").innerHTML = "";
      const t = totals();
      const upiUrl = `upi://pay?pa=dummy@invalid&pn=SweetCrumb&am=${t.total}&cu=INR&tn=Order%20${orderId}`;

      if (typeof QRCode === 'function') {
        new QRCode(document.querySelector("#upiQR"), {
          text: upiUrl,
          width: 180,
          height: 180,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
      }
      document.querySelector("#upiInstructions").innerText = "📱 Scan this QR with any UPI app (PhonePe, GPay, Paytm).";

      const upiBtn = document.querySelector("#upiPaidBtn");
      if (upiBtn) {
        upiBtn.replaceWith(upiBtn.cloneNode(true));
        document.querySelector("#upiPaidBtn").onclick = () => {
          const confirmed = confirm("✅ Have you completed the UPI payment?");
          if (!confirmed) return;
          closeModal("upiModal");
          const order = { orderId, date: now.toISOString(), items: getCart(), totals: totals(), status: "Order Placed", ...data };
          saveOrder(order);
          generateReceiptPDF(data, order);
          finalizeOrder();
        };
      } else {
        alert('UPI modal button not found.');
      }
    }

    // Card
    else if (data.payment === "Card") {
      showModal("cardModal");
      const payBtn = document.querySelector("#payCardBtn");
      if (payBtn) {
        payBtn.replaceWith(payBtn.cloneNode(true));
        document.querySelector("#payCardBtn").onclick = () => {
          const num = document.querySelector("#cardNumber").value.trim();
          const exp = document.querySelector("#cardExpiry").value.trim();
          const cvv = document.querySelector("#cardCVV").value.trim();
          if (num && exp && cvv) {
            const confirmed = confirm("✅ Confirm card payment?");
            if (!confirmed) return;
            closeModal("cardModal");
            const order = { orderId, date: now.toISOString(), items: getCart(), totals: totals(), status: "Order Placed", ...data };
            saveOrder(order);
            generateReceiptPDF(data, order);
            finalizeOrder();
          } else {
            alert("Enter valid card details.");
          }
        };
      } else {
        alert('Card modal not found.');
      }
    }
  });
}

// ======== Quiz, Slideshow, Common bind ========
function initQuizGame(){ /* your original implementation kept */ 
  const popup = $('#quizPopup');
  const playBtn = $('#playDiscountBtn');
  const closeBtn = $('#closeQuizBtn');
  const submitBtn = $('#submitAnswer');
  const questionEl = $('#quizQuestion');
  const answerEl = $('#quizAnswer');
  const resultEl = $('#quizResult');
  if(!popup || !playBtn) return;
  const quizData = [
    {q:"What kind of cake do ghosts like?",a:"scream cake"},
    {q:"If a donut goes to the dentist, what does it get?",a:"a filling"},
    {q:"Which dessert is always on time?",a:"puncake"},
    {q:"Which dessert always tells the truth?",a:"honest pie"},
    {q:"What did one cupcake say to the other?",a:"you look frosting fabulous"},
    {q:"Unscramble: IOKCOE",a:"cookie"},
    {q:"Fill in the blank: Donuts usually have a _____ in the middle.",a:"hole"},
  ];
  let selected = [];
  let current = 0, score = 0, finished = false;
  function shuffle(array) { return array.sort(() => Math.random() - 0.5); }
  function showQuestion(){
    const q = selected[current];
    questionEl.textContent = `Q${current+1}. ${q.q}`;
    questionEl.dataset.answer = q.a.toLowerCase();
    answerEl.value = "";
    resultEl.textContent = "";
    finished = false;
    submitBtn.disabled = false;
  }
  playBtn.addEventListener('click', () => {
    selected = shuffle([...quizData]).slice(0,4);
    popup.classList.remove('hidden');
    current = 0; score = 0; finished = false;
    showQuestion();
  });
  closeBtn.addEventListener('click', () => popup.classList.add('hidden'));
  submitBtn.addEventListener('click', () => {
    if(finished) return;
    const userAns = answerEl.value.trim().toLowerCase();
    const correctAns = questionEl.dataset.answer;
    if(userAns === correctAns){
      score++; resultEl.textContent = "✅ Correct!"; resultEl.style.color = "green";
    } else {
      resultEl.textContent = `❌ Oops! Correct answer: ${correctAns}`; resultEl.style.color = "red";
    }
    current++;
    setTimeout(() => {
      if(current < selected.length){ showQuestion(); }
      else {
        finished = true; submitBtn.disabled = true;
        if(score >= 2){ resultEl.textContent = `🎉 You got ${score}/${selected.length} correct! You won 10% OFF 🎂`; resultEl.style.color = "green"; localStorage.setItem('discount', 10); }
        else { resultEl.textContent = `❌ You got only ${score}/${selected.length}. Try again next time!`; resultEl.style.color = "red"; localStorage.removeItem('discount'); }
        renderCart(); renderSummary();
      }
    }, 1500);
  });
}

function initSlideshow(){
  const slides = document.querySelectorAll(".hero__slides .slide"); if(!slides.length) return;
  let current=0;
  function showSlide(index){ slides.forEach((s,i)=>s.classList.toggle("active",i===index)); }
  function nextSlide(){ current=(current+1)%slides.length; showSlide(current); }
  setInterval(nextSlide,3000); showSlide(current);
}

function bindCommon(){
  $$('#year').forEach(el=>el.textContent=new Date().getFullYear());
  $('#openCart')?.addEventListener('click', openDrawer);
  $('#openCartHero')?.addEventListener('click', openDrawer);
  $('#closeCart')?.addEventListener('click', closeDrawer);
  $('#clearCart')?.addEventListener('click', clearCart);
  updateCartBadge(); renderCart();
}
