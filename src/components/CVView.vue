<template>
  <div class="d-flex justify-center" id="root">
    <v-row>
      <v-col cols="12">
        <v-card>
          <div class="d-flex flex-column flex-sm-row flex-no-wrap justify-space-between">
            <div class="order-2 order-sm-1">
              <v-card-title class="text-h6 text-md-h5 text-lg-h4">
                <span v-if="cv?.title">{{ cv?.title }}</span>
                {{ cv?.firstName + ' ' + cv?.lastName }}
              </v-card-title>
              <v-card-text>
                <div>
                  <div class="my-1">Nearest city: {{ cv?.addressCity }}</div>
                  <div class="my-1">Email: {{ cv?.email }}</div>
                  <div class="my-1">
                    Phone: {{ cv?.phone }} <span v-if="cv?.phoneAlternative"> ({{ cv?.phoneAlternative }})</span>
                  </div>
                </div>
              </v-card-text>
              <v-card-actions v-if="!downloading">
                <v-btn
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-download"
                  title="Download"
                  @click="download"
                />
                <v-btn
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-pencil"
                  title="Edit"
                  @click="edit"
                />
                <v-btn size="small" color="surface-variant" variant="text" icon="mdi-delete" title="Delete"></v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3 order-1 order-sm-2" size="170" rounded="0">
              <v-img cover src="https://randomuser.me/api/portraits/men/1.jpg" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-col v-if="cv?.addressLine1 || cv?.addressLine2 || cv?.preferRemote || cv?.age || cv?.gender" cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col v-if="cv?.addressLine1 || cv?.addressLine2" cols="12" sm="6">
                <div>Address:</div>
                <div>{{ cv?.addressLine1 }} <span v-if="cv?.addressLine2">,</span></div>
                <div v-if="cv?.addressLine2">{{ cv?.addressLine2 }},</div>
                <div>
                  {{ cv?.addressCity }}
                </div>
                <span v-if="cv?.preferRemote">(Prefer remote work)</span>
              </v-col>
              <v-col v-else-if="cv?.preferRemote">Prefer remote work</v-col>
              <v-col v-if="cv?.age || cv?.gender" cols="12" sm="6">
                <div v-if="cv?.age">Age: {{ cv?.age }}</div>
                <div v-if="cv?.gender">Gender: {{ cv?.gender }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-subtitle-2"> Qualifications </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-if="cv?.noOfGCSEPasses" cols="12" sm="6">
                <div>No of GCSE passes: {{ cv?.noOfGCSEPasses }}</div>
              </v-col>
              <v-col v-if="cv?.primaryEducationLevel" cols="12" sm="6">
                <div>Primary education: {{ cv?.primaryEducationLevel }}</div>
                <div v-if="cv?.secondaryEducationLevel">Secondary education: {{ cv?.secondaryEducationLevel }}</div>
                <div v-if="cv?.higherEducationLevel">Higher education: {{ cv?.higherEducationLevel }}</div>
              </v-col>
              <v-col v-if="cv?.professionalQualifications?.length" cols="12" sm="6">
                <div>Professional qualifications</div>
                <div v-if="cv?.professionalQualifications[0]">{{ cv?.professionalQualifications[0] }}</div>
                <div v-if="cv?.professionalQualifications[1]">{{ cv?.professionalQualifications[1] }}</div>
                <div v-if="cv?.professionalQualifications[2]">{{ cv?.professionalQualifications[2] }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-subtitle-2"> Experience </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-if="cv?.experienceTotal" cols="12" sm="6">
                <div>Total experience (years): {{ cv?.experienceTotal }}</div>
              </v-col>
              <v-col v-if="cv?.experiences?.length" cols="12" sm="6">
                <div>Details</div>
                <div v-if="cv?.experiences[0]">{{ cv?.experiences[0] }}</div>
                <div v-if="cv?.experiences[1]">{{ cv?.experiences[1] }}</div>
                <div v-if="cv?.experiences[2]">{{ cv?.experiences[2] }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { useCVStore } from '@/stores/cv-store';
import { storeToRefs } from 'pinia';
import html2pdf from 'html2pdf.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useCVStore();
const { cv } = storeToRefs(store);

const downloading = ref(false);
function edit() {
  store.editCV();
  router.push({ name: 'cv-entry' });
}
function download() {
  downloading.value = true;
  const element = document.getElementById('root');
  const opt = {
    margin: 1,
    filename: `${cv.value?.firstName}-${cv.value?.lastName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };
  html2pdf()
    .set(opt)
    .from(element)
    .then(() => {
      downloading.value = false;
    })
    .save();
}
</script>
