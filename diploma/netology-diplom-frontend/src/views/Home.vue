<template>
    <main class="home">
        <div class="container">
            <h1 class="home__title">
                Ваши файлы
            </h1>

            <e-upload class="home__upload"
                      @update="uploadNewFile" />

            <table class="home__files files">
                <thead>
                    <tr>
                        <th class="files__header files__header-select"
                            :class="{
                                'files__header-select--show': isSeveralFilesSelected
                            }">
                            <e-checkbox v-model="allFilesSelection"
                                        :terminated="isSeveralFilesSelected"
                                        @change="selectAllFiles" />
                        </th>
                        <th class="files__header"
                            @click="changeSort('filename')">
                            Название

                            <img v-if="sortColumn === 'filename' && sortColumnReverse" src="@/assets/icons/down-arrow.svg">
                            <img v-if="sortColumn === 'filename' && !sortColumnReverse" src="@/assets/icons/up-arrow.svg">
                        </th>
                        <th class="files__header"
                            @click="changeSort('editedAt')">
                            Дата изменения

                            <img v-if="sortColumn === 'editedAt' && sortColumnReverse"
                                 src="@/assets/icons/down-arrow.svg">
                            <img v-if="sortColumn === 'editedAt' && !sortColumnReverse"
                                 src="@/assets/icons/up-arrow.svg">
                        </th>
                        <th class="files__header"
                            @click="changeSort('size')">
                            Размер

                            <img v-if="sortColumn === 'size' && sortColumnReverse" src="@/assets/icons/down-arrow.svg">
                            <img v-if="sortColumn === 'size' && !sortColumnReverse" src="@/assets/icons/up-arrow.svg">
                        </th>
                        <th class="files__header">
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th v-if="isSeveralFilesSelected"
                            class="files__global-actions"
                            colspan="4">
                            <e-button type="plain"
                                      @click="selectedDownload">
                                Скачать выбранные
                            </e-button>
                            <e-button type="plain"
                                      @click="selectedDelete">
                                Удалить выбранные
                            </e-button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(file, fileIndex) in preparedFiles"
                        :key="fileIndex"
                        :class="{
                             'files__file--error': file.error,
                             'files__file--selected': file.selected,
                             'files__file--show-select': isSeveralFilesSelected
                         }"
                        class="files__file file">
                        <td class="files__cell files__cell--select">
                            <e-checkbox v-model="file.selected" @change="onFileSelect" />
                        </td>
                        <td :title="file.filename" class="files__cell"
                            @click="file.selected = !file.selected">
                            <div :class="[
                                     `files__extension-icon--length-${file.ext.length}`
                                 ]"
                                 :style="{
                                    borderColor: getExtColor(file.ext),
                                    color: getExtColor(file.ext)
                                 }"
                                 class="files__extension-icon">
                                {{ file.ext }}
                            </div>

                            <span class="file__name">{{ getFileNameWithoutExt(file) }}</span>
                            <span>.{{ file.ext }}</span>
                        </td>
                        <td class="files__cell"
                            @click="file.selected = !file.selected">
                            <span>
                                {{ getFormattedDate(file.editedAt) }}
                            </span>
                        </td>
                        <td class="files__cell"
                            @click="file.selected = !file.selected">
                            <span>
                                {{ getFormattedSize(file.size) }}
                            </span>
                        </td>
                        <td class="files__cell files__cell--actions">
                            <e-button title="Изменить"
                                      type="text"
                                      @click="fileChangeName(file)">
                                <img src="@/assets/icons/edit.svg">
                            </e-button>
                            <e-button title="Скачать"
                                      type="text"
                                      @click="fileDownload(file)">
                                <img src="@/assets/icons/download.svg">
                            </e-button>
                            <e-button title="Удалить"
                                      type="text"
                                      @click="fileDelete(file)">
                                <img src="@/assets/icons/delete.svg">
                            </e-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script lang="ts">
    import {computed, defineComponent, reactive, ref} from 'vue';
    import EButton from '@/components/elements/EButton.vue';
    import ECheckbox from '@/components/elements/ECheckbox.vue';
    import EUpload from '@/components/elements/EUpload.vue';
    import {useStore} from "vuex";
    import {stringToHashColor} from "@/utilities/helpers";
    import moment from 'moment';
    import {uploadFile, updateFile, deleteFile, downloadFile} from "@/api/api";

    export default defineComponent({
        name: 'FilesHome',
        components: {
            EButton,
            EUpload,
            ECheckbox
        },
        setup() {
            const store = useStore();
            const sortColumn = ref('filename');
            const sortColumnReverse = ref(false);
            const files = reactive([] as any);
            const allFilesSelection = ref(false);

            const onFileSelect = () => {
                const selectedCount = files.filter((f: any) => f.selected).length;

                allFilesSelection.value = selectedCount === files.length;
            };

            const getFiles = () => {
                store.dispatch('getFiles')
                    .then(res => {
                        files.length = 0;
                        for (const file of res.data) {
                            file.error = false;
                            file.selected = false;
                            file.ext = file.filename.match(/\.\w+$/g)[0].slice(1);
                            files.push(file);
                        }

                        // Сбрасываем счетчик выделенных файлов
                        onFileSelect();
                    });
            };

            getFiles();

            const uploadNewFile = (file: any) => {
                store.dispatch('addNotification', {
                    text: `Загрузка файла "${file.name}"`,
                    status: 'loading'
                }).then(notification => {
                    uploadFile(file, file.name)
                        .then(res => {
                            setTimeout(() => {
                                getFiles();
                                notification.status = 'success';
                                notification.text = `Файл "${file.name}" успешно загружен`;
                            }, 2000);
                        })
                        .catch(res => {
                            setTimeout(() => {
                                notification.status = 'error';
                                notification.text = `Не удалось загрузить файл "${file.name}"`;
                            }, 2000);
                        })
                        .then(() => {
                            setTimeout(() => {
                                notification.hidden = true;
                            }, 5000);
                        });
                })
            };

            const preparedFiles = computed(() => {
                if (files.length === 0) return [];

                const sortedFiles = Array.from(files).sort((fileA: any, fileB: any) => {
                    if (typeof fileA[sortColumn.value] === 'number') {
                        return fileA[sortColumn.value] - fileB[sortColumn.value];
                    } else {
                        return fileA[sortColumn.value].localeCompare(fileB[sortColumn.value]);
                    }
                });

                if (sortColumnReverse.value) {
                    sortedFiles.reverse();
                }

                return sortedFiles;
            });

            const getExtColor = (ext: string) => {
                return stringToHashColor(ext);
            };

            const getFormattedDate = (timestamp: number) => {
                return moment(timestamp).format('DD.MM.YYYY HH:mm')
            };

            const getFormattedSize = (size: number) => {
                return `${(size / 1024 / 1024).toFixed(1)} МБ`;
            };

            const getFileNameWithoutExt = (file: any) => {
                return file.filename.replace(new RegExp(`.${file.ext}$`), '');
            };

            const isSeveralFilesSelected = computed(() => {
                return files.some((f: any) => f.selected);
            });

            const changeSort = (column: string) => {
                const currentColumn = sortColumn.value;

                if (column === currentColumn) {
                    sortColumnReverse.value = !sortColumnReverse.value;
                } else {
                    sortColumn.value = column;
                }
            };

            const selectAllFiles = () => {
                files.map((f: any) => {
                    f.selected = !!allFilesSelection.value;
                    return f;
                });
            };

            const fileChangeName = (file: any) => {
                store.dispatch('addNotification', {
                    text: `Переименование файла "${file.filename}"`,
                    status: 'loading'
                }).then(notification => {
                    const filename = `${Math.floor(Math.random() * 1000)}.${file.ext}`;

                    updateFile(file.filename, {filename})
                        .then(res => {
                            setTimeout(() => {
                                file.filename = filename;

                                notification.status = 'success';
                                notification.text = `Файл "${file.filename}" успешно переименован`;
                            }, 2000);
                        })
                        .catch(res => {
                            setTimeout(() => {
                                file.error = true;
                                notification.status = 'error';
                                notification.text = `Не удалось переименовать файл "${file.filename}"`;
                            }, 2000);
                        })
                        .then(() => {
                            setTimeout(() => {
                                file.error = false;
                                notification.hidden = true;
                            }, 5000);
                        });
                })
            };

            const fileDownload = (file: any) => {
                store.dispatch('addNotification', {
                    text: `Скачивание файла "${file.filename}"`,
                    status: 'loading'
                }).then(notification => {
                    downloadFile(file.filename)
                        .then((res: any) => {
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', file.filename);
                            document.body.appendChild(link);
                            link.click();

                            setTimeout(() => {
                                notification.status = 'success';
                                notification.text = `Файл "${file.filename}" успешно скачан`;
                            }, 2000);
                        })
                        .catch(res => {
                            setTimeout(() => {
                                file.error = true;
                                notification.status = 'error';
                                notification.text = `Не удалось скачать файл "${file.filename}"`;
                            }, 2000);
                        })
                        .then(() => {
                            setTimeout(() => {
                                file.error = false;
                                notification.hidden = true;
                            }, 5000);
                        });
                })
            };

            const fileDelete = (file: any) => {
                store.dispatch('addNotification', {
                    text: `Удаление файла "${file.filename}"`,
                    status: 'loading'
                }).then(notification => {
                    deleteFile(file.filename)
                        .then(res => {
                            setTimeout(() => {
                                getFiles();

                                notification.status = 'success';
                                notification.text = `Файл "${file.filename}" успешно удалён`;
                            }, 2000);
                        })
                        .catch(res => {
                            setTimeout(() => {
                                file.error = true;
                                notification.status = 'error';
                                notification.text = `Не удалось удалить файл "${file.filename}"`;
                            }, 2000);
                        })
                        .then(() => {
                            setTimeout(() => {
                                file.error = false;
                                notification.hidden = true;
                            }, 5000);
                        });
                })
            };

            const selectedDownload = () => {
                const selectedFiles = files.filter((f: any) => f.selected);

                selectedFiles.forEach((f: any) => {
                    fileDownload(f);
                });
            };

            const selectedDelete = () => {
                const selectedFiles = files.filter((f: any) => f.selected);

                selectedFiles.forEach((f: any) => {
                    fileDelete(f);
                });
            };

            return {
                files,
                allFilesSelection,
                preparedFiles,
                isSeveralFilesSelected,
                sortColumn,
                sortColumnReverse,
                uploadNewFile,
                getExtColor,
                getFormattedDate,
                getFormattedSize,
                getFileNameWithoutExt,
                selectAllFiles,
                onFileSelect,
                changeSort,
                fileChangeName,
                fileDownload,
                fileDelete,
                selectedDownload,
                selectedDelete
            }
        },
    });
</script>

<style lang="scss" scoped>
    @import "@/styles/_variables.scss";

    .container {
        margin: 0 auto;
        width: 1170px;
        max-width: calc(100% - 40px);
    }

    .home {
        padding-top: 64px;

        &__title {
            font-size: 36px;
        }

        &__upload {
            margin-top: 30px;
        }

        &__files {
            border-spacing: 0;
            margin-top: 50px;
            width: 100%;
            text-align: left;
            box-sizing: border-box;

            .files {
                &__header {
                    padding: 18px 16px;
                    border-bottom: 2px solid #C4C4C4;
                    font-size: 20px;
                    cursor: pointer;

                    img {
                        margin-left: 10px;
                    }

                    &-select {
                        border-bottom-color: transparent;
                        width: 30px;
                        opacity: 0;

                        &:hover {
                            opacity: 1;
                        }

                        &--show {
                            opacity: 1;
                        }
                    }
                }

                &__global-actions {
                    padding: 22px 0 40px;

                    .e-button:not(:first-child) {
                        margin-left: 16px;
                    }
                }

                &__file {
                    &:hover .files__cell:not(.files__cell--select) {
                        background-color: rgba(#9B9B9B, .14);
                    }

                    &:hover .files__cell.files__cell--select,
                    &--show-select .files__cell.files__cell--select {
                        opacity: 1;
                    }

                    &--error {
                        color: $color-red;
                    }

                    &--selected .files__cell:not(.files__cell--select) {
                        background-color: $color-light-blue;
                    }

                    .file {
                        &__name {
                            display: inline-block;
                            max-width: 400px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                }

                &__cell {
                    padding: 17px 16px;
                    font-size: 24px;
                    transition: .05s ease;

                    span {
                        vertical-align: middle;
                    }

                    &--select {
                        opacity: 0;
                        transition: .05s ease;
                    }

                    &--actions {
                        button:not(:first-child) {
                            margin-left: 28px;
                        }
                    }
                }

                &__extension-icon {
                    margin-right: 20px;
                    border: 2px solid #4BD0A0;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    color: #4bd0a0;
                    border-radius: 5px;
                    font-size: 8px;
                    font-weight: 700;
                    text-align: center;
                    text-transform: uppercase;

                    &--length-1,
                    &--length-2,
                    &--length-3 {
                        font-size: 14px;
                    }

                    &--length-4 {
                        font-size: 10px;
                    }
                }
            }
        }
    }
</style>
