import { getSettings } from '@/app/actions';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Pengaturan Perusahaan</h1>
        <p className="text-gray-600 mt-2">Atur informasi perusahaan yang akan ditampilkan di Invoice PDF.</p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
