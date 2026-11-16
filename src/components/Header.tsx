interface HeaderProps {
  total: number;
  completed: number;
}

export default function Header({ total, completed }: HeaderProps) {
  const active = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <header className="bg-teal-800 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Görev Panosu</h1>
          <p className="mt-1 text-teal-100">Yapılacakları ekle, düzenle ve bitirdikçe işaretle.</p>
        </div>
        <div className="flex gap-6 text-sm">
          <div>
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-teal-200">Toplam</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{active}</p>
            <p className="text-teal-200">Bekleyen</p>
          </div>
          <div>
            <p className="text-2xl font-bold">%{percent}</p>
            <p className="text-teal-200">Tamamlandı</p>
          </div>
        </div>
      </div>
    </header>
  );
}
