export default function LoginPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Вход</h1>
      <form className="flex flex-col gap-3 max-w-sm">
        <input placeholder="Email" className="border p-2 rounded" />
        <input placeholder="Пароль" type="password" className="border p-2 rounded" />
        <button className="bg-blue-600 text-white p-2 rounded">Войти</button>
      </form>
    </div>
  );
}
