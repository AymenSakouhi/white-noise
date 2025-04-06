import { uploadNoiseSchema, uploadNoiseSchemaType } from '@/schemas/noise'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addNoise } from '@/api/noises'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const UploadYourNoise = () => {
  const QueryClient = useQueryClient()

  // const [uploadedNoises, setUploadedNoises] = useState<Noise[]>([])

  const {
    register: registerUpload,
    handleSubmit: handleUploadSubmit,
    formState: { errors: uploadErrors },
    // reset: resetUpload,
  } = useForm<uploadNoiseSchemaType>({
    resolver: zodResolver(uploadNoiseSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: uploadNoiseSchemaType) => {
      // setUploadedNoises((prev) => [...prev, newNoise])
      // resetUpload()
      return addNoise(data)
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['noises'] })
    },
  })

  const onUploadSubmit = (data: uploadNoiseSchemaType) => {
    mutation.mutate(data)
  }

  return (
    <form
      onSubmit={handleUploadSubmit(onUploadSubmit)}
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
        // className="hidden"
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
