-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'IN_REVIEW', 'CLOSED', 'SPAM');

-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('INTENT', 'CONTACTED', 'RECEIPT_PENDING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('VOLUNTEER', 'INTERNSHIP', 'CORPORATE', 'DONATION', 'OTHER');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OfficeType" AS ENUM ('HEAD_OFFICE', 'REGISTERED_OFFICE', 'OTHER');

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "causeCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "formTitle" TEXT NOT NULL,
    "overlayTop" TEXT,
    "overlayBottom" TEXT,
    "heroImage" TEXT,
    "summary" TEXT,
    "bodyContent" JSONB,
    "status" "CampaignStatus" NOT NULL DEFAULT 'ACTIVE',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationIntent" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "donorName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "amountInr" INTEGER NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "panNumber" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "state" TEXT,
    "city" TEXT,
    "address" TEXT,
    "pincode" TEXT,
    "consentToContact" BOOLEAN NOT NULL DEFAULT false,
    "sourcePage" TEXT NOT NULL DEFAULT 'support-a-cause',
    "notes" TEXT,
    "status" "DonationStatus" NOT NULL DEFAULT 'INTENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sourcePage" TEXT NOT NULL DEFAULT 'contact-us',
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngagementInquiry" (
    "id" TEXT NOT NULL,
    "type" "InquiryType" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "sourcePage" TEXT NOT NULL DEFAULT 'join-us',
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EngagementInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactChannel" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "department" TEXT,
    "contactPerson" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficeLocation" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "officeType" "OfficeType" NOT NULL DEFAULT 'OTHER',
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "phone" TEXT,
    "email" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfficeLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "label" TEXT,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_slug_key" ON "Campaign"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_causeCode_key" ON "Campaign"("causeCode");

-- CreateIndex
CREATE INDEX "Campaign_status_sortOrder_idx" ON "Campaign"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "DonationIntent_campaignId_createdAt_idx" ON "DonationIntent"("campaignId", "createdAt");

-- CreateIndex
CREATE INDEX "DonationIntent_email_createdAt_idx" ON "DonationIntent"("email", "createdAt");

-- CreateIndex
CREATE INDEX "DonationIntent_status_createdAt_idx" ON "DonationIntent"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ContactSubmission_status_createdAt_idx" ON "ContactSubmission"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ContactSubmission_email_createdAt_idx" ON "ContactSubmission"("email", "createdAt");

-- CreateIndex
CREATE INDEX "EngagementInquiry_type_createdAt_idx" ON "EngagementInquiry"("type", "createdAt");

-- CreateIndex
CREATE INDEX "EngagementInquiry_status_createdAt_idx" ON "EngagementInquiry"("status", "createdAt");

-- CreateIndex
CREATE INDEX "EngagementInquiry_email_createdAt_idx" ON "EngagementInquiry"("email", "createdAt");

-- CreateIndex
CREATE INDEX "ContactChannel_isPublic_sortOrder_idx" ON "ContactChannel"("isPublic", "sortOrder");

-- CreateIndex
CREATE INDEX "OfficeLocation_officeType_sortOrder_idx" ON "OfficeLocation"("officeType", "sortOrder");

-- CreateIndex
CREATE INDEX "SocialLink_isActive_sortOrder_idx" ON "SocialLink"("isActive", "sortOrder");

-- AddForeignKey
ALTER TABLE "DonationIntent" ADD CONSTRAINT "DonationIntent_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

