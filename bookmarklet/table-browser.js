javascript:(()=>{
  const tables = [
    "CustTable",
    "CustTrans",
    "CustGroup",
    "CustInvoiceJour",
    "CustInvoiceTrans",
    "CustSettlement",
    "CustCollectionsPool",
    "CustPaymEntry",
    "CustInvoiceTable",
    "CustPackingSlipJour",
    "CustPackingSlipTrans",

    "VendTable",
    "VendTrans",
    "VendGroup",
    "VendInvoiceJour",
    "VendInvoiceTrans",
    "VendSettlement",
    "VendPaymEntry",
    "VendInvoiceInfoTable",
    "VendInvoiceInfoLine",
    "VendPackingSlipJour",
    "VendPackingSlipTrans",

    "SalesTable",
    "SalesLine",
    "SalesQuotationTable",
    "SalesQuotationLine",
    "SalesParmTable",
    "SalesParmLine",
    "SalesConfirmJour",
    "SalesPackingSlipJour",
    "SalesInvoiceJour",
    "SalesPoolTable",
    "SalesAgreementHeader",
    "SalesAgreementLine",

    "PurchTable",
    "PurchLine",
    "PurchParmTable",
    "PurchParmLine",
    "PurchConfirmJour",
    "PurchPackingSlipJour",
    "PurchInvoiceJour",
    "PurchPoolTable",
    "PurchReqTable",
    "PurchReqLine",
    "PurchAgreementHeader",
    "PurchAgreementLine",
    "PurchRFQTable",
    "PurchRFQLine",

    "InventTable",
    "InventTrans",
    "InventSum",
    "InventDim",
    "InventBatch",
    "InventLocation",
    "InventSite",
    "InventSerial",
    "InventMovement",
    "InventJournalTable",
    "InventJournalTrans",
    "InventTransferTable",
    "InventTransferLine",
    "InventItemGroup",
    "InventItemGroupItem",
    "InventTableModule",

    "WMSLocation",
    "WMSPallet",
    "WHSLoadLine",
    "WHSShipmentTable",
    "WHSWorkTable",
    "WHSWorkLine",

    "LedgerJournalTable",
    "LedgerJournalTrans",
    "LedgerTrans",
    "LedgerEntry",
    "LedgerEntryJournal",
    "GeneralJournalAccountEntry",
    "GeneralJournalEntry",
    "MainAccount",
    "DimensionAttributeValueCombination",
    "DimensionAttributeValue",
    "LedgerFiscalCalendar",
    "FiscalCalendarPeriod",
    "AssetTable",
    "AssetBook",
    "AssetTrans",
    "AssetGroup",
    "AssetDepreciationProfile",

    "ProdTable",
    "ProdBOM",
    "ProdRoute",
    "ProdJournalTable",
    "ProdJournalBOM",
    "ProdJournalRoute",
    "ProdParmStartUp",
    "ProdParmReportFinished",
    "ProjTable",
    "ProjInvoiceTable",
    "ProjInvoiceJour",
    "ProjTransPosting",
    "ProjEmplTrans",
    "ProjItemTrans",

    "HcmWorker",
    "HcmEmployment",
    "HcmPosition",
    "HcmJob",
    "DirPartyTable",
    "DirPerson",
    "LogisticsPostalAddress",
    "LogisticsElectronicAddress",

    "EcoResProduct",
    "EcoResProductTranslation",
    "EcoResCategory",
    "UnitOfMeasure",
    "UnitOfMeasureConversion",
    "InventModelGroup",
    "PriceDiscGroup",
    "PriceDiscTable",

    "TaxTable",
    "TaxData",
    "TaxTrans",
    "TaxWithholdTrans",
    "TaxGroupHeading",
    "TaxItemGroupHeading",
    "BankAccountTable",
    "BankAccountTrans",
    "BankReconciliation",
    "BankStatementTrans",
    "CustPaymJournal",
    "VendPaymJournal",

    "WorkflowTable",
    "WorkflowTrackingTable",
    "WorkflowWorkItemTable",
    "NumberSequenceTable",
    "NumberSequenceReference",
    "SysUserInfo",
    "SecurityUserRole",
    "DocuRef",
    "DocuValue",
    "InterCompanyTradingRelation",
    "CustVendExternalItem",
    "InventItemPrice",
    "InventItemPriceActivation"
  ];

  const overlay = document.createElement("div");
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);z-index:999998;animation:fadeIn 0.2s ease;`;

  const modal = document.createElement("div");
  modal.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:380px;max-height:520px;background:linear-gradient(135deg,#1a1a1a 0%,#0d0d0d 100%);border:1px solid #2a2a2a;box-shadow:0 8px 32px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.03);border-radius:6px;z-index:999999;font-family:'Consolas','Monaco',monospace;overflow:hidden;animation:slideIn 0.25s cubic-bezier(0.16,1,0.3,1);`;

  modal.innerHTML = `
    <div style="padding:20px 24px;border-bottom:1px solid #1f1f1f;background:linear-gradient(to bottom,#151515,#0f0f0f);">
      <h3 style="margin:0 0 4px 0;font-size:13px;font-weight:600;letter-spacing:1.2px;color:#b8975a;text-transform:uppercase;">Table Browser</h3>
      <p style="margin:0;font-size:11px;color:#666;letter-spacing:0.3px;">Dynamics 365 Finance & Operations</p>
    </div>
    <div style="padding:16px 24px;background:#0a0a0a;">
      <div style="display:flex;gap:8px;align-items:stretch;">
        <div style="position:relative;flex:1;min-width:0;">
          <input id="tblSearch" placeholder="Search or type table name..." style="width:100%;padding:10px 36px 10px 12px;background:#151515;border:1px solid #2a2a2a;border-radius:4px;color:#e0e0e0;font-size:12px;font-family:inherit;outline:none;transition:all 0.2s ease;box-shadow:inset 0 1px 3px rgba(0,0,0,0.3);box-sizing:border-box;">
          <button id="btnClear" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:transparent;border:none;color:#666;font-size:16px;cursor:pointer;display:none;align-items:center;justify-content:center;border-radius:3px;transition:all 0.15s ease;">×</button>
        </div>
        <button id="btnGo" style="flex-shrink:0;min-width:60px;padding:10px 18px;background:linear-gradient(135deg,#b8975a 0%,#9a7b48 100%);border:1px solid #8a6b38;border-radius:4px;color:#0d0d0d;font-size:11px;font-weight:600;font-family:inherit;letter-spacing:0.8px;cursor:pointer;transition:all 0.2s ease;text-transform:uppercase;box-shadow:0 2px 8px rgba(184,151,90,0.2);">Go</button>
      </div>
    </div>
    <div id="tblList" style="max-height:340px;overflow-y:auto;background:#0a0a0a;padding:0 8px 8px 8px;"></div>
  `;

  const list = modal.querySelector("#tblList");
  const searchInput = modal.querySelector("#tblSearch");
  const btnGo = modal.querySelector("#btnGo");
  const btnClear = modal.querySelector("#btnClear");

  const navigateToTable = (tableName) => {
    const trimmed = tableName.trim();
    if (!trimmed) {
      searchInput.style.borderColor = "#c44";
      searchInput.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(204,68,68,0.3)";
      setTimeout(() => {
        searchInput.style.borderColor = "#2a2a2a";
        searchInput.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.3)";
      }, 500);
      return;
    }
    const u = new URL(location.href);
    location.href = `${u.origin}/?cmp=${u.searchParams.get("cmp")||""}&mi=SysTableBrowser&tableName=${trimmed}`;
  };

  const toggleClearBtn = () => {
    btnClear.style.display = searchInput.value.trim() ? "flex" : "none";
  };

  btnClear.onclick = () => {
    searchInput.value = "";
    toggleClearBtn();
    render("");
    searchInput.focus();
  };

  btnClear.onmouseenter = () => {
    btnClear.style.background = "#1a1a1a";
    btnClear.style.color = "#e0e0e0";
  };

  btnClear.onmouseleave = () => {
    btnClear.style.background = "transparent";
    btnClear.style.color = "#666";
  };

  btnGo.onmouseenter = () => {
    btnGo.style.background = "linear-gradient(135deg,#c9a768 0%,#ab8954 100%)";
    btnGo.style.boxShadow = "0 4px 12px rgba(184,151,90,0.35)";
  };

  btnGo.onmouseleave = () => {
    btnGo.style.background = "linear-gradient(135deg,#b8975a 0%,#9a7b48 100%)";
    btnGo.style.boxShadow = "0 2px 8px rgba(184,151,90,0.2)";
  };

  btnGo.onclick = () => navigateToTable(searchInput.value);

  searchInput.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "a") {
      e.preventDefault();
      searchInput.select();
    }
    if (e.key === "Enter") {
      e.preventDefault();
      navigateToTable(searchInput.value);
    }
  });

  searchInput.onfocus = () => {
    searchInput.style.borderColor = "#b8975a";
    searchInput.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(184,151,90,0.2)";
  };

  searchInput.onblur = () => {
    searchInput.style.borderColor = "#2a2a2a";
    searchInput.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.3)";
  };

  const render = (keyword = "") => {
    list.innerHTML = "";
    const filtered = tables.filter(t => t.toLowerCase().includes(keyword.toLowerCase()));
    
    if (filtered.length === 0 && keyword.trim()) {
      list.innerHTML = `<div style="padding:24px 16px;text-align:center;color:#555;font-size:11px;letter-spacing:0.5px;"><div style="margin-bottom:8px;color:#666;">NO MATCHES IN LIST</div><div style="color:#444;">Press "Go" to open custom table</div></div>`;
      return;
    }

    if (filtered.length === 0) {
      list.innerHTML = `<div style="padding:32px 16px;text-align:center;color:#444;font-size:11px;letter-spacing:0.5px;">START TYPING TO SEARCH</div>`;
      return;
    }

    filtered.forEach((t) => {
      const item = document.createElement("div");
      item.textContent = t;
      item.style.cssText = `padding:11px 16px;margin:4px 0;background:#0f0f0f;border:1px solid #1a1a1a;border-left:2px solid transparent;border-radius:3px;color:#999;font-size:12px;letter-spacing:0.3px;cursor:pointer;transition:all 0.15s ease;`;
      
      item.onmouseenter = () => {
        item.style.background = "#151515";
        item.style.borderLeftColor = "#b8975a";
        item.style.color = "#e0e0e0";
        item.style.paddingLeft = "20px";
      };
      
      item.onmouseleave = () => {
        item.style.background = "#0f0f0f";
        item.style.borderLeftColor = "transparent";
        item.style.color = "#999";
        item.style.paddingLeft = "16px";
      };
      
      item.onclick = () => navigateToTable(t);
      list.appendChild(item);
    });
  };

  render();
  searchInput.oninput = e => {
    render(e.target.value);
    toggleClearBtn();
  };

  overlay.onclick = () => {
    document.body.removeChild(overlay);
    document.body.removeChild(modal);
  };

  const style = document.createElement("style");
  style.textContent = `@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideIn{from{opacity:0;transform:translate(-50%,-48%)}to{opacity:1;transform:translate(-50%,-50%)}}#tblList::-webkit-scrollbar{width:8px}#tblList::-webkit-scrollbar-track{background:#0a0a0a}#tblList::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:1px}#tblList::-webkit-scrollbar-thumb:hover{background:#3a3a3a}`;

  document.head.appendChild(style);
  document.body.appendChild(overlay);
  document.body.appendChild(modal);
  
  setTimeout(() => searchInput.focus(), 100);
})();
