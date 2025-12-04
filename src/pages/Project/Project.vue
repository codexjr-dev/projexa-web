<template>
    <div class="page">
        <div class="header">
            <p class="baseText title"> {{ project.name }} </p>
            <el-button class="exit" type="danger" @click="handleClosePage" circle>
                <el-icon class="exitIcon"><Close /></el-icon>
            </el-button>
        </div>

        <div class="content">
            <div class="col">
                <p class="baseText colTitle">Projeto</p>
                <el-card class="externCol">
                    <p class="baseText rowTitle">Descrição</p>
                    <el-card class="projInfo">
                        <el-scrollbar max-height="80px">
                            <el-text class="baseText desc">
                                {{ project.description }}
                            </el-text>
                        </el-scrollbar>
                    </el-card>

                    <p class="baseText rowTitle">Datas</p>
                    <el-card class="projInfo">
                        <div class="lineFormat">
                            <el-text class="baseText dateText">Data de início:</el-text>
                            <el-text class="baseText dateFormat">
                                    {{ formatDate(project.startDate) }}
                            </el-text>
                        </div>

                        <div class="lineFormat" style="margin-top: 2%;">
                            <el-text class="baseText dateText">Data de término:</el-text>
                            <el-text class="baseText dateFormat">
                                    {{ formatDate(project.finishDate) }}
                            </el-text>
                        </div>
                    </el-card>

                    <p class="baseText rowTitle">Tags</p>
                    <el-card class="projInfo">
                        <el-scrollbar>
                            <div style="display: flex">
                                <el-text v-for="tag in project.tags" class="baseText tag" :class="tag">
                                    {{ tag }}
                                </el-text>
                            </div>
                        </el-scrollbar>
                    </el-card>
                </el-card>
            </div>

            <div class="col">
                <p class="baseText colTitle">Time</p>
                <el-card class="externCol">
                    <el-scrollbar height="368px" style="margin-top: 1.1%;">
                        <el-card v-for="user in project.team" class="projInfo">
                            <div style="display: inline-flex;">
                                <el-row>
                                    <el-icon class="userIcon"><UserFilled /></el-icon>
                                </el-row>
                                <div style="display: relative;">
                                    <el-text class="baseText userName"> {{ user.name }} </el-text>

                                    <!-- Código para pegar a função do membro naquele projeto e atribuir
                                    como uma tag (ainda não há como selecionar a função de um membro em um
                                    determinado projeto)

                                    Obs: Deve ser criado um style css com o nome da função para poder atribuir
                                    a cor de fundo da tag -->
                                    <el-scrollbar style="margin-top: 2%; margin-left: 3%; height: 35px;">
                                        <div style="display: flex; width: 250px;">
                                            <el-text v-for="role in user.projectRules" class="baseText tag" :class="role">
                                                {{ role }}
                                            </el-text>
                                        </div>
                                    </el-scrollbar>
                                </div>
                            </div>
                        </el-card>
                    </el-scrollbar>
                </el-card>
            </div>

            <div class="col">
                <p class="baseText colTitle">Cliente</p>
                <el-card class="externCol">
                    <p class="baseText rowTitle">Nome</p>
                    <el-card class="projInfo">
                        <el-text class="baseText custText">
                            {{ customer.name }}
                        </el-text>
                    </el-card>

                    <p class="baseText rowTitle">Email</p>
                    <el-card class="projInfo">
                        <div class="lineFormat">
                            <el-text class="baseText custText">
                                {{ customer.email }}
                            </el-text>
                            <el-button class="copyButton" @click="copyEmail">
                                <el-icon><CopyDocument /></el-icon>
                            </el-button>
                        </div>
                    </el-card>

                    <p class="baseText rowTitle">Telefone</p>
                    <el-card class="projInfo">
                        <el-text class="baseText custText">
                            {{ customer.contact }}
                        </el-text>
                    </el-card>


                    <p class="baseText rowTitle">Contrato</p>
                    <el-card class="projInfo">
                        <div class="lineFormat">
                            <el-text class="baseText custText">
                                {{ project.contractLink }}
                            </el-text>
                            <el-button class="copyButton" @click="copyLink">
                                <el-icon><CopyDocument /></el-icon>
                            </el-button>
                        </div>
                    </el-card>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import scriptModule from './Project.js'

    export default {
        name: scriptModule.name,
        mounted: scriptModule.mounted,
        data: scriptModule.data,
        methods: scriptModule.methods,
    }
</script>

<style lang="scss" scoped>
    @use './Project.scss';
</style>