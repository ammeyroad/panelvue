const PAGES = [
  {
    name: "Bank",
    link: "/banks",
    children: [
      {
        name: "Cabang",
        link: "/banks/branches",
      },
      {
        name: "Produk Simpanan",
        link: "/banks/account-types",
      },
    ],
  },
  {
    name: "Pengajuan Rekening",
    link: "/account-applications",
  },
  {
    name: "Pengajuan Pinjaman",
    link: "/loan-applications",
  },
  {
    name: "Nasabah",
    link: "/customers",
    children: [{ name: "Rekening Nasabah", link: "/customers/accounts" }],
  },
];

export default PAGES;
