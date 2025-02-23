<template>
  <div
    :class="[
      'flex-1 mt-16 flex justify-center dark:background background items-center h-[calc(100vh-50px)] transition-transform duration-300',
      displayNav ? 'translate-x-[15rem] max-w-[calc(100vw-15rem)]' : 'max-w-[100vw] mx-auto'
    ]"
  >
    <div 
      class="dark:bg-surface-900 navigation p-6 rounded-md shadow-md w-full max-h-[550px] overflow-auto" 
      :class="[displayNav ? '-ml-20 max-w-[80vw]' : 'max-w-[90vw]']"
    >
      <DataTable
        :value="powerliftingRecordsRaw"
        paginator
        :rows="50"
        v-model:filters="filters"
        :globalFilterFields="['Name']"
        scrollable
        scrollHeight="60vh"
        sortField="Rank"
        pt:root="w-full"
        pt:table="headersmall w-full"
        pt:headercell="bg-gray-700 header small font-bold p-2"
        pt:cell="p-2 border-b border-gray-300"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />

            <div class="flex items-center space-x-2">
              <IconField>
                <InputIcon class="pi pi-search"/>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </IconField>

              <Button icon="pi pi-question" outlined @click="visible = true" />
            </div>

          </div>
        </template>
        <Column
          v-for="col in columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          sortable
        >
          <template v-if="col.field === 'Name'" #body="slotProps">
            {{ slotProps.data.Name }}
            <span v-if="slotProps.data.Rank === 1">
              <i class="pi pi-crown text-yellow-500 mr-2"></i>
            </span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <Drawer v-model:visible="visible" header="FAQ" position="right">
  <div class="space-y-4">
    <div>
      <p class="font-bold">Why are new competition results not displayed?</p>
      <p>There is no backend API bozo. I will manually update this whenever I can be bothered.</p>
    </div>

    <div>
      <p class="font-bold">Why are my old competition results not displayed?</p>
      <p>Only events held in South Australia are tracked.</p>
    </div>

    <div>
      <p class="font-bold">What events are being tracked?</p>
      <p>Raw SBD competitions only.</p>
    </div>
  </div>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import PrimeIcon from './components/PrimeIcon.vue';
import Drawer from 'primevue/drawer';
import FixedHeaderWithNav from './FixedHeaderWithNav.vue';
import { type PowerliftingRecord, type ProcessedPowerliftingRecord } from '../types/powerlifting';

import Papa from 'papaparse';

const powerliftingRecords = ref<PowerliftingRecord[]>([]);
const powerliftingRecordsRaw = ref<ProcessedPowerliftingRecord[]>([]);
const visible = ref<boolean>(false);
const props = defineProps({
  displayNav: Boolean
});

// NOTE: this would be an API, but I am not paying money for a backend server for this dumb app
fetch('./sa_powerlifting.csv')
  .then(response => response.text())
  .then(csvText => {
    const result = Papa.parse<PowerliftingRecord>(csvText, {
      header: true, 
      skipEmptyLines: true, 
      dynamicTyping: {
        Age: true,
        BodyweightKg: true,
        Squat1Kg: true,
        Squat2Kg: true,
        Squat3Kg: true,
        Bench1Kg: true,
        Bench2Kg: true,
        Bench3Kg: true,
        Deadlift1Kg: true,
        Deadlift2Kg: true,
        Deadlift3Kg: true,
        TotalKg: true,
        Dots: true,
        Wilks: true,
        Glossbrenner: true,
        Goodlift: true,
        Tested: (val: string) => val.toLowerCase() === "yes",
        Sanctioned: (val: string) => val.toLowerCase() === "yes",
      },
    });

    powerliftingRecords.value = result.data;
  })
  .catch(error => console.error('Error loading CSV:', error));

watch(
  () => powerliftingRecords.value,  
  (newVal) => {
    if (newVal.length > 0) {  
      const filteredRecords = newVal
        .filter(record => record.Equipment === "Raw") 
        .reduce((acc, record) => {
          if (!acc[record.Name] || acc[record.Name].Wilks < record.Wilks) {
            acc[record.Name] = {
              ...record,
              SquatKg: getMaxLift(record.Squat1Kg, record.Squat2Kg, record.Squat3Kg),
              BenchKg: getMaxLift(record.Bench1Kg, record.Bench2Kg, record.Bench3Kg),
              DeadliftKg: getMaxLift(record.Deadlift1Kg, record.Deadlift2Kg, record.Deadlift3Kg),
            };
          }
          return acc;
        }, {} as Record<string, ProcessedPowerliftingRecord>);

      powerliftingRecordsRaw.value = Object.values(filteredRecords)
        .map(record => ({
          ...record,
          Name: record.Name.split('#')[0].trim()
          }))
        .sort((a,b) => b.Dots - a.Dots)
        .map((record, index) => ({
          ...record,
          Rank: index + 1
          }));
    }
  },
  { immediate: true }
);

const getMaxLift = (lift1: number | null, lift2: number | null, lift3: number | null): number | string => {
  const lifts = [lift3, lift2, lift1]
    .filter(lift => lift !== null && !String(lift).startsWith("-"))
  
  return lifts.length > 0 ? lifts[0] : "-";
};

const columns = ref([
  { field: 'Rank', header: 'Rank' },
  { field: 'Name', header: 'Name' },
  { field: 'Date', header: 'Date' },
  { field: 'Sex', header: 'Sex' },
  { field: 'Age', header: 'Age' },
  { field: 'BodyweightKg', header: 'BW' },
  { field: 'SquatKg', header: 'Squat' },
  { field: 'BenchKg', header: 'Bench' },
  { field: 'DeadliftKg', header: 'Deadlift' },
  { field: 'TotalKg', header: 'Total' },
  { field: 'Dots', header: 'Dots' },
]);

const filters = ref({
  global: { value: null }, 
  Name: { value: null }, 
});

const clearFilter = () => {
  filters.value = {
    global: { value: null },
    Name: { value: null },
  };
};
</script>
