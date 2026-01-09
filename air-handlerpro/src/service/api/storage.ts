/**
 * File Storage Service
 * Handles all file operations with Supabase Storage
 */

import { supabase } from "@/lib/supabase";

export interface FileUploadOptions {
  bucket: string;
  folder?: string;
  file: File;
  fileName?: string;
  isPublic?: boolean;
  upsert?: boolean;
}

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  url: string;
  publicUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  options: FileUploadOptions
): Promise<ApiResponse<FileMetadata>> {
  try {
    const {
      bucket,
      folder = "",
      file,
      fileName,
      isPublic = true,
      upsert = false,
    } = options;

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("You must be logged in to upload files");
    }

    // Generate unique filename if not provided
    const timestamp = Date.now();
    const sanitizedFileName =
      fileName || file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${timestamp}_${sanitizedFileName}`;
    const filePath = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: upsert,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(uploadError.message);
    }

    // Get public URL if public bucket
    let publicUrl = "";
    if (isPublic) {
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      publicUrl = urlData.publicUrl;
    }

    // Create file metadata
    const fileMetadata: FileMetadata = {
      id: uploadData.path,
      name: sanitizedFileName,
      size: file.size,
      mimeType: file.type,
      url: filePath,
      publicUrl: publicUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: fileMetadata,
      message: "File uploaded successfully",
    };
  } catch (error) {
    console.error("Upload file error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload file",
    };
  }
}

/**
 * Upload multiple files
 */
export async function uploadMultipleFiles(
  bucket: string,
  folder: string,
  files: File[],
  isPublic: boolean = true
): Promise<ApiResponse<FileMetadata[]>> {
  try {
    const uploadPromises = files.map((file) =>
      uploadFile({ bucket, folder, file, isPublic })
    );

    const results = await Promise.all(uploadPromises);

    const successfulUploads: FileMetadata[] = [];
    const errors: string[] = [];

    results.forEach((result, index) => {
      if (result.success && result.data) {
        successfulUploads.push(result.data);
      } else {
        errors.push(`${files[index].name}: ${result.error}`);
      }
    });

    if (errors.length > 0) {
      return {
        success: false,
        data: successfulUploads,
        error: errors.join(", "),
        message: `${successfulUploads.length} files uploaded, ${errors.length} failed`,
      };
    }

    return {
      success: true,
      data: successfulUploads,
      message: `${successfulUploads.length} files uploaded successfully`,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to upload files",
    };
  }
}

/**
 * Get file from storage
 */
export async function getFile(
  bucket: string,
  filePath: string
): Promise<ApiResponse<Blob>> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(filePath);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data,
      message: "File retrieved successfully",
    };
  } catch (error) {
    console.error("Get file error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get file",
    };
  }
}

/**
 * Get public URL for a file
 */
export async function getPublicUrl(
  bucket: string,
  filePath: string
): Promise<ApiResponse<string>> {
  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return {
      success: true,
      data: data.publicUrl,
      message: "Public URL retrieved",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get public URL",
    };
  }
}

/**
 * List files in a folder
 */
export async function listFiles(
  bucket: string,
  folder: string = "",
  limit: number = 100
): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: limit,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data || [],
      message: "Files listed successfully",
    };
  } catch (error) {
    console.error("List files error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to list files",
    };
  }
}

/**
 * Delete a file from storage
 */
export async function deleteFile(
  bucket: string,
  filePath: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "File deleted successfully",
    };
  } catch (error) {
    console.error("Delete file error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete file",
    };
  }
}

/**
 * Delete multiple files
 */
export async function deleteMultipleFiles(
  bucket: string,
  filePaths: string[]
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase.storage.from(bucket).remove(filePaths);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: `${filePaths.length} files deleted successfully`,
    };
  } catch (error) {
    console.error("Delete multiple files error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete files",
    };
  }
}

/**
 * Update/Replace a file (delete old, upload new)
 */
export async function updateFile(
  bucket: string,
  oldFilePath: string,
  newFile: File,
  folder?: string
): Promise<ApiResponse<FileMetadata>> {
  try {
    // Delete old file
    const deleteResult = await deleteFile(bucket, oldFilePath);
    if (!deleteResult.success) {
      throw new Error(`Failed to delete old file: ${deleteResult.error}`);
    }

    // Upload new file
    const uploadResult = await uploadFile({
      bucket,
      folder: folder || "",
      file: newFile,
      isPublic: true,
    });

    if (!uploadResult.success) {
      throw new Error(`Failed to upload new file: ${uploadResult.error}`);
    }

    return {
      success: true,
      data: uploadResult.data,
      message: "File updated successfully",
    };
  } catch (error) {
    console.error("Update file error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update file",
    };
  }
}

/**
 * Move/Rename a file
 */
export async function moveFile(
  bucket: string,
  fromPath: string,
  toPath: string
): Promise<ApiResponse<void>> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .move(fromPath, toPath);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "File moved successfully",
    };
  } catch (error) {
    console.error("Move file error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to move file",
    };
  }
}

/**
 * Create a signed URL for temporary access (for private buckets)
 */
export async function createSignedUrl(
  bucket: string,
  filePath: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<ApiResponse<string>> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data.signedUrl,
      message: "Signed URL created",
    };
  } catch (error) {
    console.error("Create signed URL error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create signed URL",
    };
  }
}

/**
 * Get file size and metadata
 */
export async function getFileMetadata(
  bucket: string,
  filePath: string
): Promise<ApiResponse<any>> {
  try {
    // List the specific file to get metadata
    const pathParts = filePath.split("/");
    const fileName = pathParts.pop();
    const folder = pathParts.join("/");

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        search: fileName,
      });

    if (error) {
      throw new Error(error.message);
    }

    const fileInfo = data?.find((f) => f.name === fileName);

    if (!fileInfo) {
      throw new Error("File not found");
    }

    return {
      success: true,
      data: fileInfo,
      message: "File metadata retrieved",
    };
  } catch (error) {
    console.error("Get file metadata error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get file metadata",
    };
  }
}

/**
 * Check if file exists
 */
export async function fileExists(
  bucket: string,
  filePath: string
): Promise<boolean> {
  try {
    const result = await getFileMetadata(bucket, filePath);
    return result.success;
  } catch (error) {
    return false;
  }
}