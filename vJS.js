let runAllowed = true;
let variables = typeof variables !== "undefined" ? variables : {};

let con = null;

function addAction(dict) {
  if (runAllowed) {
    vJS.data.actions.push(dict);
    vJS.render();
  }
}

export const vJS = {
  data: { actions: [] },

  init(domId = "console") {
    con = document.getElementById(domId);
  },

  defVar(key, val) {
    addAction({ action: "defVar", key, val });
    variables[key] = val;
  },

  log(msg) {
    addAction({ action: "log", msg });
    this.render();
  },

  render() {
    if (!con) return;
    try {
      con.textContent = JSON.stringify(this.data, null, 2);
    } catch (_) {}
  },

  kill() {
    this.data.actions = [];
    this.render();
  },

  varLog() {
    addAction({ action: "varLog", variables });
  },

  receive(data) {
    variables.received = data;
  },

  prob(separator) {
    addAction({ action: "prob", separator });
    runAllowed = false;
  },

  scripting: {
    show(msg)        { addAction({ action: "show", msg }); },
    showAlert(msg,title,cancel) { addAction({ action: "showAlert", msg, title, cancel }); },
    ask(msg,ph,ml)   { addAction({ action: "ask", msg, placeholder: ph, multipleLines: ml }); },
    menu(opts,prompt){ addAction({ action: "menu", options: opts, prompt }); },
    showDefinition(w){ addAction({ action: "showDefinition", word: w }); },
    getEmojiName(e)  { addAction({ action: "getEmojiName", emoji: e }); },
    correctSpelling(text) { addAction({ action: "correctSpelling", text }); },
    dictate(lang)    { addAction({ action: "dictate", language: lang }); }
  }
};