import { fetcher } from '@/lib/fetcher'
import { uploadNoiseSchemaType } from '@/schemas/noise'

/* export const getNoises = async () => {
  const token = localStorage.getItem('token')
  return fetcher<{ todos: any[] }>({
    url: '/api/noise/',
    method: 'GET',
    token,
  })
} */

type AddNoiseResponse = {
  message: string
  noise: {
    title: string
    fileType: string
    path: string
  }
}

export const addNoise = async (file: uploadNoiseSchemaType) => {
  const token = localStorage.getItem('token')
  const noise = file.whiteNoiseFile?.[0]

  if (!noise) {
    throw new Error('No file selected')
  }

  const formData = new FormData()
  formData.append('title', noise.name.split('.')[0])
  formData.append('fileType', noise.type) // more accurate than name.split
  formData.append('file', noise)

  // DEBUG: Log formData properly
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }

  return fetcher<AddNoiseResponse>({
    url: '/api/noises/add/',
    method: 'POST',
    token,
    body: formData,
  })
}
