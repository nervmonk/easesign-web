// This must be a client component to handle user interaction (clicking tabs)
"use client";

import React, { useState } from "react";

const PrivacyNotice = () => {
  // State to keep track of the active language tab
  const [activeTab, setActiveTab] = useState("Bahasa"); // Default to 'Bahasa'

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          Privacy Notice
        </h1>

        {/* Language Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveTab("Bahasa")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "Bahasa"
                  ? "border-cyan-500 text-cyan-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Bahasa
            </button>
            <button
              onClick={() => setActiveTab("English")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "English"
                  ? "border-cyan-500 text-cyan-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              English
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-6 border border-gray-200 rounded-md">
          {/* Conditional Rendering: Show content based on the active tab */}
          {activeTab === "Bahasa" && (
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl font-semibold text-gray-800">
                Pemberitahuan Privasi
              </h2>
              <p className="font-medium">
                Pemberitahuan Privasi Tanggal Berlaku: 13 Juni 2024
              </p>
              <p>
                Keberadaan Pemberitahuan Privasi ini adalah komitmen dari PT
                Paramita Digital Nusantara (selanjutnya disebut sebagai
                “EaseSign”) untuk menghormati dan melindungi setiap data atau
                informasi pribadi Pengguna melalui situs http://easesign.id,
                situs turunannya, serta Aplikasi EaseSign (selanjutnya disebut
                sebagai <strong className="font-bold">“Situs”</strong> dan{" "}
                <strong className="font-bold">“Aplikasi EaseSign”</strong>).
                Pemberitahuan Privasi ini hanya berlaku untuk layanan EaseSign,
                termasuk namun tidak terbatas pada Easy Sign dan Easy Stamp,
                serta layanan lainnya yang disediakan oleh EaseSign dari waktu
                ke waktu (selanjutnya disebut sebagai{" "}
                <strong className="font-bold">“Layanan EaseSign”</strong>).
                Pemberitahuan Privasi ini bertujuan untuk memberikan informasi
                kepada Pengguna EaseSign mengenai bagaimana EaseSign melakukan
                pengumpulan, pemrosesan, transformasi, pengungkapan,
                penyimpanan, pengamanan, analisis, penghapusan, dan/atau
                penghancuran data pribadi Pengguna EaseSign untuk tujuan Layanan
                EaseSign (selanjutnya disebut sebagai{" "}
                <strong className="font-bold">“Pemrosesan”</strong> atau{" "}
                <strong className="font-bold">“Memproses”</strong> atau{" "}
                <strong className="font-bold">“Diproses”</strong>). Dengan
                menggunakan Layanan EaseSign, Pengguna memahami bahwa EaseSign
                akan memproses data pribadi Pengguna sebagaimana dijelaskan
                dalam Pemberitahuan Privasi ini. Penggunaan EaseSign diatur oleh
                Pemberitahuan Privasi ini dan Syarat Penggunaan Layanan
                EaseSign.
              </p>
              <p>
                Pemberitahuan Privasi ini akan berlaku setelah Pengguna
                memberikan persetujuan secara eksplisit terhadap Pemberitahuan
                Privasi ini, baik secara tegas maupun melalui metode yang
                diuraikan dalam Pemberitahuan Privasi ini.
              </p>
              <p>
                Pemberitahuan Privasi ini akan berlaku setelah Pengguna
                memberikan persetujuan secara eksplisit terhadap Pemberitahuan
                Privasi ini, baik secara tegas maupun melalui metode yang
                diuraikan dalam Pemberitahuan Privasi ini.
              </p>
              <p>
                <strong className="font-bold">DEFINISI</strong> Setiap istilah
                yang diawali dengan huruf besar memiliki arti sebagai berikut:
              </p>
              <p>
                “<strong className="font-bold">Akun EaseSign</strong>” adalah
                setiap akun yang diterbitkan oleh EaseSign, dengan nama
                EaseSignID, di mana setiap pemilik akun akan diberikan userID,
                memilih kata sandi, dan dapat menyimpan Data Pribadi mereka.
              </p>
              <p>
                “<strong className="font-bold">Aplikasi EaseSign</strong>”
                adalah aplikasi mobile (mobile apps) yang dioperasikan oleh PT
                Paramita Digital Nusantara.
              </p>
              <p>
                “<strong className="font-bold">Data Dasar</strong>” adalah Data
                Pribadi yang diperlukan oleh EaseSign untuk dapat menerbitkan
                EaseSignID dan membuat Akun EaseSign.
              </p>
              <p>
                “<strong className="font-bold">Data Pribadi</strong>” adalah
                setiap data yang mengidentifikasi atau dapat digunakan untuk
                mengidentifikasi seseorang, baik sendiri maupun dalam kombinasi
                dengan data/informasi lain, secara langsung atau tidak langsung,
                dalam sistem elektronik dan/atau non-elektronik, yang dibagi
                menjadi Data Pribadi Khusus/Sensitif dan Data Pribadi Umum.
              </p>
              <p>
                “
                <strong className="font-bold">
                  Data Pribadi Khusus/Sensitif
                </strong>
                ” adalah Data Pribadi yang bersifat sensitif dan memerlukan
                perlindungan khusus dan lebih tinggi dibandingkan dengan
                perlindungan Data Pribadi lainnya sesuai dengan hukum dan
                peraturan yang berlaku. Misalnya, Data Pribadi Khusus/Sensitif
                termasuk namun tidak terbatas pada data/informasi keuangan
                pribadi, Data Pribadi anak-anak, data biometrik, catatan
                kriminal, informasi kesehatan, data genetik, dan data lain yang
                pemrosesannya dapat memiliki dampak besar sesuai dengan hukum
                dan peraturan yang berlaku.
              </p>
              <p>
                “<strong className="font-bold">Data Umum</strong>” adalah Data
                Pribadi yang bersifat umum dan tidak termasuk dalam kategori
                Data Pribadi Khusus/Sensitif, termasuk namun tidak terbatas
                pada; nama lengkap, jenis kelamin, alamat, tempat dan tanggal
                lahir, nomor telepon, alamat email, pekerjaan, nomor
                identifikasi yang diterbitkan oleh lembaga berwenang (seperti,
                antara lain; Kartu Tanda Penduduk (KTP), Surat Izin Mengemudi
                (SIM) atau paspor), kewarganegaraan, serta profil dan nomor
                identifikasi unik yang diterbitkan oleh EaseSign kepada Pengguna
                Layanan EaseSign.
              </p>
              <p>
                “<strong className="font-bold">Layanan EaseSign</strong>”
                berarti layanan untuk menerbitkan Sertifikat Elektronik, membuat
                Tanda Tangan Elektronik Easy Sign, Sistem Manajemen Dokumen,
                Easy Stamp dan/atau layanan EaseSign lainnya yang dinyatakan
                oleh EaseSign dari waktu ke waktu, baik melalui Situs EaseSign
                atau Aplikasi.
              </p>
              <p>
                <strong className="font-bold">
                  “Pemrosesan” atau “Memproses” atau “Diproses”
                </strong>{" "}
                berarti mengumpulkan, memproses, memproses, mengungkapkan,
                menyimpan, mengamankan, menganalisis, menghapus dan/atau
                menghancurkan Data Pribadi Pengguna untuk tujuan Layanan
                EaseSign.
              </p>
              <p>
                “<strong className="font-bold">Pengguna</strong>” berarti setiap
                individu termasuk namun tidak terbatas pada Warga Negara
                Indonesia (WNI) dan/atau Warga Negara Asing (WNA) atau badan
                hukum/badan usaha yang mengakses Platform EaseSign dan/atau
                menggunakan Layanan EaseSign.
              </p>
              <p>
                “<strong className="font-bold">Pihak Ketiga</strong>” adalah
                individu dan/atau badan hukum/badan usaha yang bekerja sama
                dengan EaseSign dan dapat dibuktikan dengan dokumen yang
                mengikat hak dan kewajiban masing-masing pihak.
              </p>
              <p>
                “<strong className="font-bold">EaseSign</strong>” berarti PT
                Paramita Digital Nusantara dan/atau anak perusahaannya,
                perusahaan afiliasi yang memiliki hubungan langsung atau tidak
                langsung dengan PT Paramita Digital Nusantara.
              </p>
              <p>
                “<strong className="font-bold">EaseSignID</strong>” berarti kode
                alfanumerik yang diterbitkan oleh EaseSign, yang dapat dikaitkan
                dengan nama unik (username), untuk mengidentifikasi Pengguna
                saat menggunakan Layanan EaseSign.
              </p>
              <p>
                “<strong className="font-bold">Situs</strong>” berarti setiap
                URL yang menggunakan domain dengan alamat “http://easesign.id”
                atau situs lain yang dinyatakan oleh EaseSign dari waktu ke
                waktu.
              </p>
              <p>
                “<strong className="font-bold">Tanda Tangan Elektronik</strong>”
                adalah tanda tangan yang terdiri dari Informasi Elektronik yang
                dilampirkan, dikaitkan atau terkait dengan Informasi Elektronik
                lainnya yang digunakan sebagai alat verifikasi dan autentikasi.
              </p>
              <p>
                “
                <strong className="font-bold">
                  Materai Elektronik (e-Materai)
                </strong>
                ” adalah tanda bukti pelunasan Bea Materai yang diterbitkan
                secara elektronik oleh pemerintah dan digunakan pada dokumen
                elektronik sesuai dengan peraturan perundang-undangan yang
                berlaku di Indonesia.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                PENGUMPULAN DATA PRIBADI
              </h2>
              <p>
                EaseSign dapat mengumpulkan Data Pribadi Pengguna yang
                diperlukan untuk menyediakan Layanan EaseSign. Pengumpulan Data
                Pribadi dilakukan dengan cara yang sah dan sesuai dengan hukum
                yang berlaku, baik secara langsung dari Pengguna maupun secara
                otomatis ketika Pengguna mengakses atau menggunakan Layanan
                EaseSign. Data Pribadi yang dikumpulkan dapat meliputi, namun
                tidak terbatas pada:
              </p>
              <p>
                <strong className="font-bold">Data Identifikasi Pribadi</strong>{" "}
                seperti nama lengkap, jenis kelamin, tempat dan tanggal lahir,
                alamat, nomor telepon, dan alamat email.
              </p>
              <p>
                <strong className="font-bold">Data Verifikasi Identitas</strong>{" "}
                seperti nomor identifikasi yang diterbitkan oleh lembaga
                berwenang (misalnya, KTP, SIM, atau paspor).
              </p>
              <p>
                <strong className="font-bold">Data Teknis</strong> seperti
                alamat IP, jenis perangkat yang digunakan, sistem operasi, dan
                informasi lain yang dikumpulkan melalui cookies atau teknologi
                pelacakan lainnya.
              </p>
              <p>
                <strong className="font-bold">Data Aktivitas</strong> seperti
                data tentang penggunaan Layanan EaseSign, riwayat transaksi, dan
                data interaksi dengan sistem EaseSign.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                PENGGUNAAN DATA PRIBADI
              </h2>
              <p>
                Data Pribadi yang dikumpulkan oleh EaseSign akan digunakan untuk
                tujuan-tujuan berikut:
              </p>
              <ol>
                <li>
                  1. Memverifikasi identitas Pengguna dan memberikan akses ke
                  Layanan EaseSign.
                </li>
                <li>2. Mengelola dan mengoperasikan Layanan EaseSign.</li>
                <li>3. Menyediakan layanan pelanggan dan dukungan teknis.</li>
                <li>
                  4. Meningkatkan dan mengembangkan Layanan EaseSign, termasuk
                  melakukan penelitian dan analisis.
                </li>
                <li>5. Memenuhi kewajiban hukum dan peraturan yang berlaku.</li>
                <li>
                  6. Mengirimkan informasi terkait layanan, termasuk
                  pemberitahuan, pembaruan, dan promosi.
                </li>
                <li>
                  7. Menjaga keamanan dan integritas data Pengguna serta sistem
                  EaseSign.
                </li>
              </ol>
              <h2 className="text-xl font-semibold text-gray-800">
                PENGUNGKAPAN DATA PRIBADI
              </h2>
              <p>
                EaseSign tidak akan menjual, menyewakan, atau memperdagangkan
                Data Pribadi Pengguna kepada pihak ketiga tanpa persetujuan
                Pengguna. Namun, EaseSign dapat mengungkapkan Data Pribadi
                Pengguna kepada pihak ketiga dalam kondisi-kondisi berikut:
              </p>
              <p>
                <strong className="font-bold">
                  Kepada Penyedia Layanan Pihak Ketiga
                </strong>{" "}
                yang membantu dalam penyediaan Layanan EaseSign, termasuk namun
                tidak terbatas pada layanan verifikasi identitas, layanan cloud,
                dan layanan pembayaran.
              </p>
              <p>
                <strong className="font-bold">Dalam Hal Kewajiban Hukum</strong>{" "}
                di mana EaseSign diwajibkan untuk mengungkapkan Data Pribadi
                Pengguna berdasarkan perintah pengadilan, undang-undang, atau
                peraturan yang berlaku.
              </p>
              <p>
                <strong className="font-bold">
                  Dalam Kasus Keamanan dan Perlindungan Hak
                </strong>{" "}
                di mana pengungkapan diperlukan untuk melindungi keamanan,
                properti, atau hak-hak EaseSign, Pengguna, atau pihak lain yang
                terkait.
              </p>
              <p>
                <strong className="font-bold">Dalam Proses Bisnis</strong>{" "}
                seperti merger, akuisisi, atau penjualan aset, di mana Data
                Pribadi Pengguna dapat menjadi bagian dari aset yang dialihkan.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                PENYIMPANAN DAN KEAMANAN DATA PRIBADI
              </h2>
              <p>
                EaseSign mengambil langkah-langkah yang wajar untuk melindungi
                Data Pribadi Pengguna dari akses, pengungkapan, perubahan, atau
                penghancuran yang tidak sah. Langkah-langkah keamanan yang
                diterapkan termasuk penggunaan enkripsi, kontrol akses, dan
                prosedur keamanan teknis lainnya. Data Pribadi Pengguna akan
                disimpan selama diperlukan untuk memenuhi tujuan pengumpulannya
                atau sebagaimana diwajibkan oleh hukum yang berlaku.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                HAK PENGGUNA
              </h2>
              <p>
                Pengguna memiliki hak-hak berikut terkait dengan Data Pribadi
                mereka:
              </p>
              <p>
                <strong className="font-bold">Hak Akses</strong> untuk meminta
                salinan Data Pribadi yang dimiliki oleh EaseSign.
              </p>
              <p>
                <strong className="font-bold">Hak Koreksi</strong> untuk
                memperbaiki Data Pribadi yang tidak akurat atau tidak lengkap.
              </p>
              <p>
                <strong className="font-bold">Hak Penghapusan</strong> untuk
                meminta penghapusan Data Pribadi dalam kondisi tertentu.
              </p>
              <p>
                <strong className="font-bold">Hak Pembatasan Pemrosesan</strong>{" "}
                untuk membatasi pemrosesan Data Pribadi dalam kondisi tertentu.
              </p>
              <p>
                <strong className="font-bold">Hak Portabilitas Data</strong>{" "}
                untuk memperoleh Data Pribadi dalam format yang dapat
                dipindahkan.
              </p>
              <p>
                <strong className="font-bold">Hak Penarikan Persetujuan</strong>{" "}
                untuk menarik persetujuan yang telah diberikan terkait dengan
                pemrosesan Data Pribadi.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                PERUBAHAN PEMBERITAHUAN PRIVASI
              </h2>
              <p>
                EaseSign dapat memperbarui Pemberitahuan Privasi ini dari waktu
                ke waktu. EaseSign akan memberitahukan Pengguna mengenai
                perubahan materiil pada Pemberitahuan Privasi ini melalui email
                atau pemberitahuan pada Situs dan Aplikasi EaseSign. Pengguna
                disarankan untuk secara berkala meninjau Pemberitahuan Privasi
                ini untuk mengetahui perubahan terbaru.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                HUBUNGI KAMI
              </h2>
              <p>
                Jika Pengguna memiliki pertanyaan atau kekhawatiran mengenai
                Pemberitahuan Privasi ini atau praktik privasi EaseSign,
                Pengguna dapat menghubungi kami melalui info@easesign.id
              </p>
              <p>
                <strong className="font-bold">
                  Dengan menggunakan Layanan EaseSign, Pengguna menyetujui
                  pemrosesan Data Pribadi sebagaimana diuraikan dalam
                  Pemberitahuan Privasi ini.
                </strong>
              </p>
            </div>
          )}

          {activeTab === "English" && (
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl font-semibold text-gray-800">
                Privacy Notice
              </h2>
              <p className="font-medium">
                Privacy Notice Effective Date: June 13, 2024
              </p>
              <p>
                The existence of this Privacy Notice is a commitment from PT
                Paramita Digital Nusantara (hereinafter referred to as
                “EaseSign”) to respect and protect any personal data or
                information of Users through the website http://easesign.id, its
                derivative sites, as well as the EaseSign Application
                (hereinafter referred to as{" "}
                <strong className="font-bold">Site</strong> dan{" "}
                <strong className="font-bold">“EaseSign Application”</strong>).
                This Privacy Notice applies only to EaseSign services, including
                but not limited to Easy Sign and Easy Stamp, as well as other
                services provided by EaseSign from time to time (hereinafter
                referred to as
                <strong className="font-bold">“EaseSign Services”</strong>).
                This Privacy Notice aims to provide EaseSign Users with
                information regarding how EaseSign conducts the collection,
                processing, transformation, disclosure, storage, safeguarding,
                analysis, erasure and/or destruction of EaseSign Users’ personal
                data for the purposes of the EaseSign Services (hereinafter
                referred to as
                <strong className="font-bold">“Processing”</strong> or{" "}
                <strong className="font-bold">“Processing”</strong> atau{" "}
                <strong className="font-bold">“Processed”</strong>). By using
                the EaseSign Service, Users understand that EaseSign will
                process Users’ personal data as described in this Privacy
                Notice. The use of EaseSign is governed by this Privacy Notice
                and the Terms of Use of the EaseSign Service.
              </p>
              <p>
                This Privacy Notice shall take effect upon User’s explicit
                consent to this Privacy Notice, either expressly or through the
                methods described in this Privacy Notice.
              </p>
              <p>
                <strong className="font-bold">DEFINITIONS</strong> Each
                capitalized term has the following meaning:
              </p>
              <p>
                “<strong className="font-bold">EaseSign Account</strong>” means
                any account issued by EaseSign, under the name EaseSignID, where
                each account holder will be assigned a userID, choose a
                password, and be able to store their Personal Data.
              </p>
              <p>
                “<strong className="font-bold">EaseSign App</strong>” is a
                mobile app operated by PT Paramita Digital Nusantara.
              </p>
              <p>
                “<strong className="font-bold">Basic Data</strong>” means the
                Personal Data required by EaseSign to be able to issue
                EaseSignID and create EaseSign Account.
              </p>
              <p>
                “<strong className="font-bold">Personal Data</strong>” is any
                data that identifies or can be used to identify a person, either
                alone or in combination with other data/information, directly or
                indirectly, in electronic and/or non-electronic systems, which
                is divided into Special/Sensitive Personal Data and General
                Personal Data.
              </p>
              <p>
                “
                <strong className="font-bold">
                  Special/Sensitive Personal Data
                </strong>
                ” is Personal Data that is sensitive in nature and requires
                special and higher protection compared to the protection of
                other Personal Data in accordance with applicable laws and
                regulations. For example, Special/Sensitive Personal Data
                includes but is not limited to personal financial
                data/information, children’s Personal Data, biometric data,
                criminal records, health information, genetic data, and other
                data whose processing may have a major impact in accordance with
                applicable laws and regulations.
              </p>
              <p>
                “<strong className="font-bold">General Data</strong>” means
                Personal Data that is general in nature and does not fall under
                the category of Special/Sensitive Personal Data, including but
                not limited to; full name, gender, address, place and date of
                birth, telephone number, email address, occupation,
                identification number issued by an authorized institution (such
                as, among others; Identity Card (KTP), Driver’s License (SIM) or
                passport), nationality, and unique profiles and identification
                numbers issued by EaseSign to Users of the EaseSign Service.
              </p>
              <p>
                “<strong className="font-bold">EaseSign Services</strong>” means
                services for issuing Electronic Certificates, creating Easy Sign
                Electronic Signatures, Document Management System, Easy Stamp
                and/or any other EaseSign services declared by EaseSign from
                time to time, whether through the EaseSign Site or the App.
              </p>
              <p>
                <strong className="font-bold">
                  “Processing” or “Processing” or “Processed”
                </strong>{" "}
                means collecting, processing, processing, disclosing, storing,
                securing, analyzing, deleting and/or destroying Users’ Personal
                Data for the purposes of the EaseSign Services.
              </p>
              <p>
                “<strong className="font-bold">User</strong>” means any
                individual including but not limited to Indonesian Citizens
                (WNI) and/or Foreign Citizens (WNA) or legal entities/business
                entities who access the EaseSign Platform and/or use the
                EaseSign Services.
              </p>
              <p>
                “<strong className="font-bold">Third Parties</strong>” are
                individuals and/or legal entities/business entities that
                cooperate with EaseSign and can be proven by documents that bind
                the rights and obligations of each party.
              </p>
              <p>
                “<strong className="font-bold">EaseSign</strong>” means PT
                Paramita Digital Nusantara and/or its subsidiaries, affiliated
                companies that have a direct or indirect relationship with PT
                Paramita Digital Nusantara.
              </p>
              <p>
                “<strong className="font-bold">EaseSignID</strong>” means an
                alphanumeric code issued by EaseSign, which can be associated
                with a unique name (username), to identify Users when using the
                EaseSign Service.
              </p>
              <p>
                “<strong className="font-bold">Site</strong>” means any URL
                utilizing a domain with the address “http://easesign.id” or such
                other site as declared by EaseSign from time to time.
              </p>
              <p>
                “<strong className="font-bold">Electronic Signature</strong>” is
                a signature consisting of Electronic Information attached,
                associated or related to other Electronic Information used as a
                verification and authentication tool.
              </p>
              <p>
                “
                <strong className="font-bold">
                  Electronic Materai (e-Materai)
                </strong>
                ” is a proof of payment of Stamp Duty issued electronically by
                the government and used on electronic documents in accordance
                with applicable laws and regulations in Indonesia.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                PERSONAL DATA COLLECTION
              </h2>
              <p>
                EaseSign may collect Users’ Personal Data necessary to provide
                the EaseSign Services. The collection of Personal Data is
                conducted by lawful means and in accordance with applicable
                laws, either directly from Users or automatically when Users
                access or use the EaseSign Services. The Personal Data collected
                may include, but is not limited to:
              </p>
              <p>
                <strong className="font-bold">
                  Personal Identification Data
                </strong>{" "}
                such as full name, gender, place and date of birth, address,
                phone number, and email address.
              </p>
              <p>
                <strong className="font-bold">
                  Identity Verification Data
                </strong>{" "}
                such as an identification number issued by an authorized
                institution (e.g., ID card, driver’s license, or passport).
              </p>
              <p>
                <strong className="font-bold">Technical Data</strong> such as IP
                address, type of device used, operating system, and other
                information collected through cookies or other tracking
                technologies.
              </p>
              <p>
                <strong className="font-bold">Activity Data</strong> such as
                data about the use of the EaseSign Service, transaction history,
                and interaction data with the EaseSign system.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                USE OF PERSONAL DATA
              </h2>
              <p>
                Personal Data collected by EaseSign will be used for the
                following purposes:
              </p>
              <ol>
                <li>
                  1. Verifying the User’s identity and granting access to the
                  EaseSign Service.
                </li>
                <li>2. Manage and operate the EaseSign Service.</li>
                <li>3. Provide customer service and technical support.</li>
                <li>
                  4. Improve and develop the EaseSign Service, including
                  conducting research and analysis.
                </li>
                <li>5. Fulfill applicable legal and regulatory obligations.</li>
                <li>
                  6. Sending service-related information, including
                  notifications, updates and promotions.
                </li>
                <li>
                  7. Maintain the security and integrity of User data and the
                  EaseSign system.
                </li>
              </ol>
              <h2 className="text-xl font-semibold text-gray-800">
                DISCLOSURE OF PERSONAL DATA
              </h2>
              <p>
                EaseSign will not sell, rent or trade Users’ Personal Data to
                third parties without Users’ consent. However, EaseSign may
                disclose User’s Personal Data to third parties under the
                following conditions:
              </p>
              <p>
                <strong className="font-bold">
                  To Third Party Service Providers
                </strong>{" "}
                who assist in the provision of EaseSign Services, including but
                not limited to identity verification services, cloud services
                and payment services.
              </p>
              <p>
                <strong className="font-bold">
                  In the Event of Legal Obligation
                </strong>{" "}
                where EaseSign is required to disclose Users’ Personal Data
                based on a court order, applicable laws or regulations.
              </p>
              <p>
                <strong className="font-bold">
                  In Security and Rights Protection Cases
                </strong>{" "}
                where disclosure is necessary to protect the security, property
                or rights of EaseSign, Users or other related parties.
              </p>
              <p>
                <strong className="font-bold">In Business Processes</strong>{" "}
                such as mergers, acquisitions, or asset sales, where Users’
                Personal Data may become part of the transferred assets.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                RETENTION AND SECURITY OF PERSONAL DATA
              </h2>
              <p>
                EaseSign takes reasonable steps to protect Users’ Personal Data
                from unauthorized access, disclosure, alteration or destruction.
                The security measures implemented include the use of encryption,
                access control, and other technical security procedures. Users’
                Personal Data will be retained for as long as necessary to
                fulfill the purposes for which it was collected or as required
                by applicable law.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                USER RIGHTS
              </h2>
              <p>
                Users have the following rights in relation to their Personal
                Data:
              </p>
              <p>
                <strong className="font-bold">Access Right</strong> to request a
                copy of Personal Data held by EaseSign.
              </p>
              <p>
                <strong className="font-bold">Right of Correction</strong> to
                correct inaccurate or incomplete Personal Data.
              </p>
              <p>
                <strong className="font-bold">The Right to Erasure</strong> to
                request deletion of Personal Data under certain conditions.
              </p>
              <p>
                <strong className="font-bold">
                  The Right to Restriction of Processing
                </strong>{" "}
                to restrict the processing of Personal Data under certain
                conditions.
              </p>
              <p>
                <strong className="font-bold">Right to Data Portability</strong>{" "}
                to obtain Personal Data in a transferable format.
              </p>
              <p>
                <strong className="font-bold">Right to Withdraw Consent</strong>{" "}
                to withdraw consent that has been given in relation to the
                processing of Personal Data.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                CHANGES OF PRIVACY NOTICE
              </h2>
              <p>
                EaseSign may update this Privacy Notice from time to time.
                EaseSign will notify Users of material changes to this Privacy
                Notice via email or a notice on the EaseSign Site and App. Users
                are advised to periodically review this Privacy Notice for the
                latest changes.
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                CONTACT US
              </h2>
              <p>
                If User has any questions or concerns regarding this Privacy
                Notice or EaseSign’s privacy practices, User may contact us at
                info@easesign.id.
              </p>
              <p>
                <strong className="font-bold">
                  By using the EaseSign Service, Users consent to the processing
                  of Personal Data as outlined in this Privacy Notice.
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
