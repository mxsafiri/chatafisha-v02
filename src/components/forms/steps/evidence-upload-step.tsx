"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { X, Upload, Image, FileVideo, FileText } from "lucide-react"
import type { ProjectSubmissionFormData } from "@/lib/validations/project"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type EvidenceType = "image" | "video" | "document"

interface Evidence {
  id: string
  type: EvidenceType
  url: string
  description: string
  timestamp: string
  location: {
    name: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  fileType: string
  fileSize: number
  fileName: string
}

const MAX_FILES = 10
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const ACCEPTED_FILE_TYPES = {
  image: [".jpeg", ".jpg", ".png", ".webp"],
  video: [".mp4", ".webm"],
  document: [".pdf"],
}

export function EvidenceUploadStep() {
  const { control, setValue, watch } = useFormContext<ProjectSubmissionFormData>()
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const files: Evidence[] = watch("evidence") || []

  const handleFiles = async (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return

    const validFiles = Array.from(uploadedFiles).filter((file) => {
      const ext = "." + file.name.split(".").pop()?.toLowerCase()
      const isValidType = Object.values(ACCEPTED_FILE_TYPES).flat().includes(ext)
      const isValidSize = file.size <= MAX_FILE_SIZE
      return isValidType && isValidSize
    })

    if (validFiles.length + files.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files`)
      return
    }

    const newFiles: Evidence[] = validFiles.map((file) => {
      const ext = "." + file.name.split(".").pop()?.toLowerCase()
      let type: EvidenceType = "document"
      if (ACCEPTED_FILE_TYPES.image.includes(ext)) type = "image"
      if (ACCEPTED_FILE_TYPES.video.includes(ext)) type = "video"

      return {
        id: crypto.randomUUID(),
        type,
        url: URL.createObjectURL(file),
        description: "",
        timestamp: new Date().toISOString(),
        location: {
          name: "Unknown Location",
          coordinates: { lat: 0, lng: 0 },
        },
        fileType: file.type,
        fileSize: file.size,
        fileName: file.name,
      }
    })

    setValue("evidence", [...files, ...newFiles])
  }

  const removeFile = (id: string) => {
    setValue(
      "evidence",
      files.filter((file) => file.id !== id)
    )
  }

  const getFileIcon = (type: EvidenceType) => {
    switch (type) {
      case "image":
        return Image
      case "video":
        return FileVideo
      default:
        return FileText
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div
        onDragEnter={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          accept={Object.values(ACCEPTED_FILE_TYPES).flat().join(",")}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-semibold">
          Drop your files here or click to upload
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload up to {MAX_FILES} files (max {MAX_FILE_SIZE / 1024 / 1024}MB each)
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supported formats: JPEG, PNG, WebP, MP4, WebM, PDF
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Uploaded Files</h3>
          <ScrollArea className="h-[300px] rounded-md border p-4">
            <div className="grid grid-cols-2 gap-4">
              {files.map((file) => (
                <Card key={file.id}>
                  <CardHeader className="relative pb-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {file.type === "image" ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={file.url}
                          alt={file.description || "Uploaded image"}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-4">
                        {React.createElement(getFileIcon(file.type), {
                          className: "h-8 w-8",
                        })}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {file.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file.fileSize / 1024 / 1024).toFixed(2)}MB
                          </p>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-4">
                    <FormField
                      control={control}
                      name={`evidence.${files.indexOf(file)}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Add a description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <div className="flex items-center gap-2">
            <Progress value={(files.length / MAX_FILES) * 100} />
            <span className="text-sm text-muted-foreground">
              {files.length}/{MAX_FILES} files
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
