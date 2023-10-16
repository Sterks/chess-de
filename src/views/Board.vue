<script>
import { BoardApi, TheChessboard } from 'vue3-chessboard';
import {store} from '../store';
import 'vue3-chessboard/style.css';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiClockFast } from '@mdi/js'

export default {
  components: {
    TheChessboard,
    BoardApi,
    SvgIcon
  },
  compatConfig: { MODE: 3 },
  data() {
    return {
      store,
      theChessboar: {},
      path: mdiClockFast,
      message: '',
      boardAPI: {},
      knowledge: 0,
      player: new Audio(),
      play_sound: false,
      current_time: 0.0,
      // playing: false,
      percentage: 0,
      boardConfig: {
        // fen: "rnbqkbnr/pppp1p1p/8/8/2B1Pp2/5p2/PPPP2PP/RNBQ1RK1 w kq - 0 6",
        coordinates: true,
        premovable: {
            enabled: false,
            showDests: false,
            castle: false,
        },
        animation: { // modify piece animations
            enabled: true,
            duration: 1000,
        },
        draggable: {
          enabled: true,
          distance: 1000,
          autoDistance: true,
          showGhost: true,
          deleteOnDropOff: true,
        },

      },
      // arrayStep: ["e4", "e5", "f4", "exf4", "Qf3", "g5", "O-O" ],
      // __1. е4 е5 2. f4 ef 3. Кf3 g5 4. Cс4 g4 5. 0—0 gf. __
      // , "Кf3", "g5", "Cс4", "g4", "0—0 gf" 
      inputStep: '',
      inputArray: [],
      outputArray: [],
      message2: '',
      message3: '',
      item_s: {
        number: 1,
        white: "e4",
        black: "e5",
      }
      // gege: "1. e4 e5 2. f4 exf4"
    }
  },
  computed: {
    count() {
      console.log(this.$store.state)
      return this.$store.state.count
    },
    precent() {
      return this.knowledge.toFixed();
    }
  },
  created() {
    var interval = setInterval(() => {
      if(this.knowledge < 100)
        this.knowledge = this.player.currentTime
      else
        clearInterval(interval);
    }, 10);
  },
  methods: {
    nStep() {
      this.$store.commit('nextSt')
    },
    play() {
      console.log('Play outside of');
      this.player.src = '../Voice001.m4a';
      console.log(this.current_time)
      this.player.currentTime = this.current_time
      this.player.play();
      this.play_sound = true
    },
    pause() {
      this.player.pause()
      this.current_time = this.player.currentTime
      console.log(this.player.currentTime)
      this.play_sound = false
    }, 
    stop() {
      this.player.pause();
      console.log(this.player);
      var piece = this.player.currentTime / this.player.duration;
      console.log("duration:", this.player.duration, "/", this.player.currentTime, "=", piece )
      console.log(piece * 100, this.player.currentTime)
      this.player.currentTime = 0.0;
      this.play_sound = false;
    },
    messagePrint(move) {
      this.message = move
      this.message2 = this.boardAPI.getHistory()
      console.log(move)
      this.outputArray.push(this.message)
    },
     resetMove() {
        this.boardAPI.resetBoard()
        this.message = ''
        this.message2 = ''
        this.message3 = ''
        this.outputArray = []
      },
      undo() {
        this.boardAPI.undoLastMove()
      },
      handleGetHistory() {
        console.log(this.boardAPI.getHistory({verbose: true}))
      },
      pgn(){
        this.boardAPI.loadPgn(this.gege)
      },
      viewHistory() {
        // мрачный фон и ход назад с учетом позиции
        this.boardAPI.viewHistory(0)
      },
      viewNext() {
        this.boardAPI.viewNext()
      },
      viewPrevious() {
        this.boardAPI.viewPrevious()
      },
      getPgnInfo() {
        console.log(this.boardAPI.getPgnInfo())
      },
      setFen() {
        this.boardAPI?.setPosition(this.inputStep)
        // this.boardAPI?.setPosition("rnbqkbnr/pppp1p1p/8/8/2B1Pp2/5p2/PPPP2PP/RNBQ1RK1 w kq - 0 6")
      },
      drawMoves() {
        this.boardAPI.drawMove("e2", "e4", "red")
      },
      parse_fen(index){
        console.log(index)
        // console.log(this.outputArray[index].after)
        this.boardAPI?.setPosition(this.outputArray[index].after)
      },
      moveNext2(){
        this.inputArray = this.inputStep.split(" ")
        let interval = 1000; //one second
        this.inputArray.forEach((step, index) => {
          setTimeout(() => {
            console.log(step)
            this.boardAPI?.move(step)
          }, index * interval)
        })
      },
    }
  }

</script>

<template>
  <v-row class="line">
    <v-progress-linear
      v-model="knowledge"
      height="25"
      style="margin-bottom: 20px;"
      >
      <strong>{{ Math.ceil(knowledge) }}%</strong>
    </v-progress-linear>
  </v-row>

  <div class="flex-container">

  <!-- <div style="display: flex;"> -->
    <div>
      <v-card class="board">
          <TheChessboard
          :board-config="boardConfig"
          @board-created="(api) => (boardAPI = api)"
          @move="messagePrint"
        />
      </v-card>
    </div>
    <div class="history">
        <v-sheet class="">
          <v-card class="three">
            <div class="title">
              <h4 class="">
                <fa icon="fa-solid fa-clock" />
                  Game History
              </h4>
            </div>
            <div class="">
              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">
                      move
                    </th>
                    <th class="text-left">
                      white
                    </th>
                    <th class="text-left">
                      black
                    </th>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in outputArray">
                  <tr>
                    <td>{{index+1}}</td>
                    <button @click="parse_fen(index)"><td>{{item.san}}</td></button>
                    <td v-if="item.color === 'b'"> <fa icon="circle" /></td>
                    <td v-if="item.color === 'w'"> <fa icon="fa-solid fa-dot-circle" /></td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-card>
        </v-sheet>
    </div>

<!---->
        <div>
          <v-card class="">
            <v-sheet>
              <div class="title">
                <svg-icon type="mdi" :path="path"></svg-icon>
                <h4 class="v-heading mb-2 text-h7">
                    menu
                </h4>
              </div>
              <div class="">
              <v-text-field  
              v-model="inputStep"
              label="Введите ход ..e4"
              hide-details="auto"
            />
            </div>
            
            <v-item-group>
              <div>
              <v-item>
              <v-btn @click="moveNext2">Step</v-btn>
            </v-item>
            <v-item>
              <v-btn @click="undo">Undo</v-btn>
            </v-item>
          </div>
          <div>
            <v-item>
              <v-btn @click="resetMove">Reset</v-btn>
            </v-item>
            <v-item>
              <v-btn @click="drawMoves">drawMovev</v-btn>
            </v-item>
            <v-item>
              <v-btn @click="setFen">setFen</v-btn>
            </v-item>
            <v-item>
              <v-btn v-if="play_sound === false" @click="play">&#9654</v-btn>
              <v-btn v-if="play_sound === true" @click="pause">&#9208</v-btn>
            </v-item>
            <v-item>
              <v-btn @click="stop">&#9209</v-btn>
            </v-item>
          </div>
            
            </v-item-group>
              <v-card-text v-if="message">
                <v-divider></v-divider>
                  <p>
                    <p>Color: {{ message.color }}</p>
                    <p>Piece: {{ message.piece }}</p>
                    <p>From: {{ message.from }}</p>
                    <p>To: {{ message.to }}</p>
                    <p>San: {{ message.san }}</p>
                    <p>Flags: {{ message.flags }}</p>
                    <p>Lan: {{ message.lan }}</p>
                    <p><b>Before:</b> <p>{{ message.before }}</p></p>
                    <p><b>After:</b> <p>{{ message.after }}</p></p>
                  </p>
                </v-card-text>
              <v-card-text v-if="message2">
                  <p>History:</p>
                  <p>
                      {{ message2 }}
                  </p>
              </v-card-text>
            </v-sheet>
          </v-card>
        </div>
  </div>
</template>
<style>
  body{
    padding-top: 60px;
    padding-left: 20vh;
  }
  .flex-container{
    display: flex;
  }
  #app{
    display: flex;
  }
  .board {
    display: flex;
    align-items: center;
  }
  .three {
    width: 30vh !important;
  }
  .main-wrap {
    max-width: 50vh;
    left: 100px;
  }
  .v-card {
    height: 70vh !important;
    width: 50vh;
  }
  @media (min-width: 1024px) {
    .three {
      width: 40vh !important;
    }
    .v-card {
      height: 70vh !important;
      width: 50vh;
    }
  }
</style>
