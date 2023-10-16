<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                file: '',
                message: '',
                message2: '',
            }
        },
        methods: {
            sendFile() {
                this.message = ''
                this.message2 = ''
                let formData = new FormData();
                formData.append('file', this.file);
                axios.defaults.baseURL = "https://api.chess.rfcontract.ru"
                axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    
                })
                .then(response => {
                    this.message2 = "uploaded successfully";
                    // console.log(response);
                    // console.log(response.response.data.mesasge)
                })
                .catch(error => {
                    this.message = error.response.data.message
                    // console.log(error);
                    // console.log()
                });
            },
            handleFileUpload(e) {
                this.file = e.target.files[0]
            }
        },
    }
</script>

<template>
    <v-card class="card-file" >
        <v-card-title>
            Прикрепите файл
        </v-card-title>
        <v-card-subtitle>
            <div class="message">{{ message }}</div>
            <div class="message2">{{ message2 }}</div>
        </v-card-subtitle>
        <br />
        <div>
            <v-form>
            <v-file-input @change="handleFileUpload" type="file" label="Select file"></v-file-input>
            <v-btn @click="sendFile" block class="mt-2">проверить</v-btn>
        </v-form>
        </div>
    </v-card>
</template>

<style>
    .card-file {
        margin-top: 2rem;
        padding: 10px;
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