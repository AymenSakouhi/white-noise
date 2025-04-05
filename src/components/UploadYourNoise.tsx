import { uploadNoiseSchema, uploadNoiseSchemaType } from '@/schemas/noise'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type Noise = {
  title: string
  icon: string
  path: string
  fileType: string
}

const UploadYourNoise = () => {
  const [uploadedNoises, setUploadedNoises] = useState<Noise[]>([])

  const {
    register: registerUpload,
    handleSubmit: handleUploadSubmit,
    formState: { errors: uploadErrors },
    reset: resetUpload,
  } = useForm<uploadNoiseSchemaType>({
    resolver: zodResolver(uploadNoiseSchema),
  })

  const onSubmitUpload = (data: uploadNoiseSchemaType) => {
    const file = data.whiteNoiseFile[0]
    if (!file) return
    const blobUrl = URL.createObjectURL(file)
    const newNoise: Noise = {
      title: file.name.split('.')?.[0],
      icon: file.name.split('.')?.[0],
      path: blobUrl,
      fileType: file.name.split('.')?.[1],
    }
    setUploadedNoises((prev) => [...prev, newNoise])
    resetUpload()
  }

  return (
    <form
      onSubmit={handleUploadSubmit(onSubmitUpload)}
      className="w-full flex flex-col items-center justify-center mt-6"
    >
      <label
        htmlFor="whiteNoiseFile"
        className="cursor-pointer bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-500 transition"
      >
        Upload your own noise
      </label>
      <input
        {...registerUpload('whiteNoiseFile')}
        type="file"
        id="whiteNoiseFile"
        accept="audio/*"
        className="hidden"
      />
      {uploadErrors.whiteNoiseFile && (
        <p className="text-red-500 mt-2 text-sm">
          uploadErrors.whiteNoiseFile.message
        </p>
      )}
      <Button
        type="submit"
        className="mt-4 bg-sky-600 rounded-lg px-4 py-2 hover:bg-sky-500"
      >
        Submit
      </Button>
    </form>
  )
}

export default UploadYourNoise
