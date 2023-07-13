class BoggleGame {
    // make a new game

    constructor(boardId, secs = 60) {
        this.secs = secs;
        this.showTimer();
        this.score = 0;
        this.words = new Set();
        this.board = $("#" + boardId);

        this.timer = setInterval(this.tick.bind(this), 1000);

        $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
    }

    // Show word in a list of words
    showWord(word) {
        $(".words", this.board).append($("<li>", { text: word }));
    }

    // show score in HTML 
    showScore() {
        $(".score", this.board).text(this.score);
    }

    // show status message 
    showMsg(msg, cls) {
        $(".msg", this.board)
            .text(msg)
            .removeClass()
            .addClass(`msg ${cls}`);
    }

    // handle submission of word: if its valid and unique, display score and msg
    async handleSubmit(evt) {
        evt.preventDeafult();
        const $word = $(".word", this.board);

        let word = $word.val();
        if (!word) return;

        if (this.words.has(word)) {
            this.showMsg(`Already found ${word}`, "err");
            return;
        }

        // checking word validity
        const resp = await axios.get("/check-word", { params: { word: word } });
        if (resp.data.result === "not-word") {
            this.showMsg(`${word} is not a valid English word`, "err");
        }
        else if (resp.data.result === "not-on-board") {
            this.showMsg(`${word} is not a valid word on this board`, "err");
        }
        else {
            this.showMsg(word);
            this.score += word.length;
            this.showScore();
            this.words.add(word);
            this.showMsg(`Added: ${word}`, "ok");
        }

        $word.val("").focus();
    }

    // handle a second passing in the game
    async tick() {
        this.secs -= 1;
        this.showTimer();

        if (this.secs === 0) {
            clearInterval(this.timer);
            await this.scoreGame();
        }
    }

    // update the timer
    showTimer() {
        $(".timer", this.board).text(this.secs);
    }

    // score and message update when the game ends
    async scoreGame() {
        $(".add-word", this.board).hide();
        const resp = await axios.post("/post-score", { score: this.score });
        if (resp.data.newHighScore) {
            this.showMsg(`Congradulations You have a new high score: ${this.score}`, "ok");
        }
        else {
            this.showMsg(`Final score: ${score}`, "ok");
        }
    }
}