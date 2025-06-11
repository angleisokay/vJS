<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <p id="console"></p>
    <script>
     let variables = variables
     let con = document.getElementById("console");
     let runAllowed = true;

        // the essential stuff for the things and stuff
        const vconsole = {
            data: {
                actions: []
            },
	     defVar(key, val) {
		 addAction({action: "defVar", key, val});
		 variables[key] = val
	     },
            log(msg) {
                addAction({action: "log", msg})
                this.render()              
            },
            render() {
                con.textContent = JSON.stringify(this.data, null, 2)
            },
            kill() {
                this.data.actions = []
                this.render()                    
            },
            varLog() {
                this.data.actions.push({action: "varLog", variables})
                this.render()
            },
            receive(data) {
                variables.received = data
            },
            prob(separator) {
		addAction({action: "prob", separator})
               runAllowed = false
            },
        }
        function wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function addAction(dict) {
            if (runAllowed === true) {
                vconsole.data.actions.push(dict)
                vconsole.render()
            }
        }

        // Actions
        const scripting = {
            show(msg) {
                addAction({action: "show", msg})
            },
            showAlert(msg, title, cancel) {
                addAction({action: "showAlert", msg, title, cancel})
            },
            ask(msg, placeholder, multipleLines) {
                addAction({action: "ask", msg, placeholder, multipleLines})
            },
            menu(options, prompt) {
                addAction({action: "menu", options, prompt})
            },
            showDefinition(word) {
                addAction({action: "showDefinition", word})
            },
	     getEmojiName(emoji) {
		 addAction({action: "getEmojiName", emoji})  
	     },
	    correctSpelling(text) {
		 addAction({action: "correctSpelling", text})
	     },
	     dictate(language) {
		 addAction({action: "dictate", language})
       	}
      };
    </script>
    <script>
	  ±±±±±±
    </script>
</body>
</html>
