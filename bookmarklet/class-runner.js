javascript:(()=>{
  const overlay = document.createElement("div");
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);z-index:999998;animation:fadeIn 0.2s ease;`;

  const modal = document.createElement("div");
  modal.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:360px;background:linear-gradient(135deg,#1a1a1a,#0d0d0d);border:1px solid #2a2a2a;border-radius:6px;box-shadow:0 8px 32px rgba(0,0,0,0.6);z-index:999999;font-family:'Consolas','Monaco',monospace;animation:slideIn 0.25s cubic-bezier(0.16,1,0.3,1);overflow:hidden;`;

  modal.innerHTML = `
    <div style="padding:18px 22px;border-bottom:1px solid #1f1f1f;background:linear-gradient(to bottom,#151515,#0f0f0f);">
      <h3 style="margin:0;font-size:13px;font-weight:600;letter-spacing:1.2px;color:#b8975a;text-transform:uppercase;">
        Class Runner
      </h3>
      <p style="margin:2px 0 0;font-size:11px;color:#666;">Dynamics 365 FO</p>
    </div>

    <div style="padding:18px 22px;background:#0a0a0a;display:flex;gap:8px;">
      <div style="flex:1;position:relative;">
        <input id="clsInput" placeholder="Type class name..." 
          style="width:100%;padding:10px 36px 10px 12px;background:#151515;border:1px solid #2a2a2a;color:#e0e0e0;border-radius:4px;font-size:12px;outline:none;transition:0.2s;">
        <button id="clsClear" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:transparent;border:none;color:#666;font-size:16px;cursor:pointer;display:none;">×</button>
      </div>

      <button id="btnRun" style="padding:10px 18px;background:linear-gradient(135deg,#b8975a,#9a7b48);border:1px solid #8a6b38;border-radius:4px;color:#0d0d0d;font-size:11px;font-weight:600;cursor:pointer;text-transform:uppercase;letter-spacing:0.8px;box-shadow:0 2px 8px rgba(184,151,90,0.2);">
        Run
      </button>
    </div>
  `;

  const input = modal.querySelector("#clsInput");
  const btnClear = modal.querySelector("#clsClear");
  const btnRun = modal.querySelector("#btnRun");

  const runClass = () => {
    const cls = input.value.trim();
    if (!cls) {
      input.style.borderColor = "#c44";
      input.style.boxShadow = "0 0 0 1px rgba(204,68,68,0.4)";
      setTimeout(()=>{ 
        input.style.borderColor="#2a2a2a"; 
        input.style.boxShadow="none";
      },500);
      return;
    }
    const u = new URL(location.href);
    const cmp = u.searchParams.get("cmp") || "IJS";
    const url = `${u.origin}/?cmp=${cmp}&mi=SysClassRunner&Cls=${encodeURIComponent(cls)}`;
    location.href = url;
  };

  input.oninput = () => { btnClear.style.display = input.value ? "block" : "none"; };
  btnClear.onclick = () => { input.value=""; btnClear.style.display="none"; input.focus(); };
  btnRun.onclick = runClass;

  input.addEventListener("keydown", e=>{
    if(e.key === "Enter"){ e.preventDefault(); runClass(); }
  });

  overlay.onclick = () => {
    document.body.removeChild(overlay);
    document.body.removeChild(modal);
  };

  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes slideIn { from{opacity:0;transform:translate(-50%,-48%)} to{opacity:1;transform:translate(-50%,-50%)} }
  `;
  document.head.appendChild(style);

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  setTimeout(()=>input.focus(),150);
})();
