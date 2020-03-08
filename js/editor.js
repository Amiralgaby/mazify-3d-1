var app = new Vue({
    el: '#app',
    data: {
        map: [],
        n: 20,
        m: 20,
        blockSize: 20,
        selectedType: 1,
    },
    mounted() {
        if (localStorage.getItem("maze-data") != undefined) {
            let data = JSON.parse(localStorage.getItem("maze-data"));
            let mazeData = data.data.map((v, idx) => {
                let i = Math.floor(idx / 20);
                let j = idx % 20;
                return {
                    top: 0 + (i * this.blockSize),
                    left: 0 + (j * this.blockSize),
                    type: v,
                    id: idx
                }
            });
            this.map = mazeData;
            this.n = data.height;
            this.m = data.width;
        } else {
            let count = 0;
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    this.map.push({
                        top: 0 + (i * this.blockSize),
                        left: 0 + (j * this.blockSize),
                        type: 0,
                        id: count++
                    })
                }
            }
        }

    },
    methods: {
        changeTile(e) {
            if (e.buttons == 1 || e.type == "click") {
                let idx = parseInt(e.target.id);
                this.map[idx].type = this.selectedType;
            }
        },
        save() {
            let arr = [];
            this.map.forEach(item => {
                arr.push(item.type);
            });

            let data = {
                "data": arr,
                "height": this.n,
                "width": this.m
            }
            localStorage.setItem("maze-data", JSON.stringify(data));
        }
    }
})