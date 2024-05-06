import {
  DeleteObjectsCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity"
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"
import { v4 as uuid } from "uuid"

export const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: process.env.NEXT_PUBLIC_AWS_REGION }),
    identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID as string,
  }),
})

function getRestaurantPath(id: number) {
  return `${encodeURIComponent(id)}/`
}

function getRestaurantImagesPath(id: number) {
  return getRestaurantPath(id) + `restaurant/`
}

function getDishImagesPath(id: number) {
  return getRestaurantPath(id) + `dishes/`
}

function getDishModelsPath(id: number) {
  return getRestaurantPath(id) + `models/`
}

export function getFileUrl(key: string) {
  const href = `https://s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/`
  const bucketUrl = href + process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
  return `${bucketUrl}/${encodeURIComponent(key)}`
}

export function getOptimizedImageUrl(key: string, width: number = 640) {
  return `${process.env.SERVER_URL}/_next/image?url=${getFileUrl(key)}&w=${width}&q=75`
}

export function getFileExtension(file: File): string {
  return file.name.split(".").pop() as string
}

async function getBucketObjects() {
  const list = await s3.send(
    new ListObjectsCommand({ Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME })
  )

  if (list.Contents == null) return []
  return list.Contents.map((v) => v.Key)
}

export function addFile(key: string, file: File | Blob | Buffer) {
  return s3
    .send(
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: key,
        Body: file,
      })
    )
    .then(() => console.log(`Successfully uploaded file: ${key}`))
    .catch((e) => console.error("There was an error uploading file: ", e.message))
}

export async function addRestaurantImageAsync(restaurantId: number, file: File) {
  const guid = uuid()
  const key = `${getRestaurantImagesPath(restaurantId)}${guid}.${getFileExtension(file)}`
  await addFile(key, file)
  return key
}

export async function addDishImage(restaurantId: number, file: File) {
  const guid = uuid()
  const key = `${getDishImagesPath(restaurantId)}${guid}.${getFileExtension(file)}`
  await addFile(key, file)
  return key
}

export async function addDishModel(restaurantId: number, file: File) {
  const guid = uuid()
  const key = `${getDishModelsPath(restaurantId)}${guid}.${getFileExtension(file)}`
  await addFile(key, file)
  return key
}

export function deleteFile(key: string) {
  return s3
    .send(
      new DeleteObjectsCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Delete: { Objects: [{ Key: key }] },
      })
    )
    .then(() => console.log(`Successfully delete file: ${key}`))
    .catch((e) => console.error("There was an error deleting file: ", e.message))
}

export async function clearBucket() {
  const list = await getBucketObjects()
  console.log(list)
  if (list.length === 0) {
    console.log("Bucket is empty, no need to clear")
    return
  }

  return s3
    .send(
      new DeleteObjectsCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Delete: { Objects: list.map((Key) => ({ Key })) },
      })
    )
    .then(() => console.log("Successfully cleared bucket"))
    .catch((e) => console.error("There was an error clearing bucket: " + e.message))
}
