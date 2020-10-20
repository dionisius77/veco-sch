import { PUSH_DETAIL_NILAI } from './ConfigNilai';

const initialState = {
  dataKelas: {
    uniqueId: '',
    kegiatan: '',
    mataPelajaran: '',
    tanggal: '',
    kelas: '',
    selesai: '',
    title: '',
  },
}

export function ReducerNilai(state = initialState, action) {
  switch (action.type) {
    case PUSH_DETAIL_NILAI:
      initialState.dataKelas = action.value;
      return {
        dataKelas: initialState.dataKelas
      }

    default:
      return state;
  }
}