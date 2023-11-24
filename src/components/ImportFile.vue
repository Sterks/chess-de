<script>
    export default {
        data() {
            return {
                file: '',
                name: '',
                message: '',
                message2: '',
                message5: '',
                obj: {},
            }
        },
        methods: {
            sendFile2() {
                let formData = new FormData();
                formData.append('name', 'new book');
                formData.append('file', this.file);
                // fetch( 'https://api.chess.rfcontract.ru/upload', {
                fetch( 'http://localhost:8001/upload', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => this.message2 = data)
                .catch(error =>
                    // console.error(error)
                    this.message5 = error
                );
            },
            handleFileUpload(e) {
                this.file = e.target.files[0]
                console.log(this.file)
            }
        },
    }
</script>

<template>
    <v-card class="card-file" >
        <v-card-title>
            Прикрепите файл
        </v-card-title>
        <!-- <v-card-subtitle>
            <div class="message">{{ message }}</div>
            <div class="message2">{{ message2 }}</div>
        </v-card-subtitle> -->
        <br />
        <div>
            <v-form>
            <v-file-input @change="handleFileUpload" type="file" label="Select file"></v-file-input>
            <v-btn @click="sendFile2" block class="mt-2">проверить</v-btn>
        </v-form>
        </div>
    </v-card>
    <v-card class="card-file" v-if="message5">
        <v-card-subtitle>
            Обработка:
        </v-card-subtitle>
            <!-- {{ message }} -->
            <!-- <div class="message2">{{ message2 }}</div> -->
        <v-card-text>
            <div class="message">{{ message5 }}</div>
        </v-card-text>
       
    </v-card>
    <v-card class="card-file" v-if="message2">
        <v-card-subtitle>
            Обработка:
        </v-card-subtitle>
            <!-- {{ message }} -->
            <v-card-text>
                <div class="message2">Название файла: {{ message2.filename }}</div>
                <div class="message2">{{ message2.status }}</div>
                <div class="message2">{{ message2.mainStep }}</div>
            </v-card-text>
            <!-- {{ message5 }} -->
       
    </v-card>
</template>

<style>
    .card-file {
        margin-top: 2rem;
        padding: 20px !important;
        width: 45rem;
        height: 15rem;
    }
    .message{
        color: red;
    }
    .message2{
        color: green;
    }
</style>
