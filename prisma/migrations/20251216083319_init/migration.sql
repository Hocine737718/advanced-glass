-- CreateTable
CREATE TABLE "UserAccount" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "alt_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" SERIAL NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageTranslation" (
    "id" SERIAL NOT NULL,
    "page_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,

    CONSTRAINT "PageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "page_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "position" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionTranslation" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,

    CONSTRAINT "SectionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionItem" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "position" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionItemTranslation" (
    "id" SERIAL NOT NULL,
    "section_item_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,

    CONSTRAINT "SectionItemTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionItemMedia" (
    "id" SERIAL NOT NULL,
    "section_item_id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "role" TEXT,
    "position" INTEGER,

    CONSTRAINT "SectionItemMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "target" TEXT NOT NULL DEFAULT '_self',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionItemLink" (
    "section_item_id" INTEGER NOT NULL,
    "link_id" INTEGER NOT NULL,

    CONSTRAINT "SectionItemLink_pkey" PRIMARY KEY ("section_item_id","link_id")
);

-- CreateTable
CREATE TABLE "Modal" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Modal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModalTranslation" (
    "id" SERIAL NOT NULL,
    "modal_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,

    CONSTRAINT "ModalTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModalMedia" (
    "id" SERIAL NOT NULL,
    "modal_id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "role" TEXT,

    CONSTRAINT "ModalMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionItemModal" (
    "section_item_id" INTEGER NOT NULL,
    "modal_id" INTEGER NOT NULL,

    CONSTRAINT "SectionItemModal_pkey" PRIMARY KEY ("section_item_id","modal_id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "role" TEXT,
    "email" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonTranslation" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT,
    "position" TEXT,

    CONSTRAINT "PersonTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "label" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "person_id" INTEGER NOT NULL,
    "label" TEXT,
    "number" TEXT NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PageTranslation_page_id_language_key" ON "PageTranslation"("page_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "SectionTranslation_section_id_language_key" ON "SectionTranslation"("section_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "SectionItemTranslation_section_item_id_language_key" ON "SectionItemTranslation"("section_item_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Modal_code_key" ON "Modal"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ModalTranslation_modal_id_language_key" ON "ModalTranslation"("modal_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "PersonTranslation_person_id_language_key" ON "PersonTranslation"("person_id", "language");

-- AddForeignKey
ALTER TABLE "PageTranslation" ADD CONSTRAINT "PageTranslation_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageTranslation" ADD CONSTRAINT "PageTranslation_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionTranslation" ADD CONSTRAINT "SectionTranslation_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionTranslation" ADD CONSTRAINT "SectionTranslation_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItem" ADD CONSTRAINT "SectionItem_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemTranslation" ADD CONSTRAINT "SectionItemTranslation_section_item_id_fkey" FOREIGN KEY ("section_item_id") REFERENCES "SectionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemTranslation" ADD CONSTRAINT "SectionItemTranslation_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemMedia" ADD CONSTRAINT "SectionItemMedia_section_item_id_fkey" FOREIGN KEY ("section_item_id") REFERENCES "SectionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemMedia" ADD CONSTRAINT "SectionItemMedia_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemLink" ADD CONSTRAINT "SectionItemLink_section_item_id_fkey" FOREIGN KEY ("section_item_id") REFERENCES "SectionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemLink" ADD CONSTRAINT "SectionItemLink_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModalTranslation" ADD CONSTRAINT "ModalTranslation_modal_id_fkey" FOREIGN KEY ("modal_id") REFERENCES "Modal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModalTranslation" ADD CONSTRAINT "ModalTranslation_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModalMedia" ADD CONSTRAINT "ModalMedia_modal_id_fkey" FOREIGN KEY ("modal_id") REFERENCES "Modal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModalMedia" ADD CONSTRAINT "ModalMedia_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemModal" ADD CONSTRAINT "SectionItemModal_section_item_id_fkey" FOREIGN KEY ("section_item_id") REFERENCES "SectionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionItemModal" ADD CONSTRAINT "SectionItemModal_modal_id_fkey" FOREIGN KEY ("modal_id") REFERENCES "Modal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonTranslation" ADD CONSTRAINT "PersonTranslation_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonTranslation" ADD CONSTRAINT "PersonTranslation_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
