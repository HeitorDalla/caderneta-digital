<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Login | MedNotes - Caderneta Digital</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
    <link rel="stylesheet" href="/public/home/login.css"/>
    <link rel="shortcut icon" type="image/svg" href="/logo-aba_book-medical-solid.svg"/>
</head>

<body class="bg-gray-50 min-h-screen">
    <div id="login-screen" class="fixed inset-0 bg-blue-500 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <div class="text-center mb-6">
                <i class="fas fa-book-medical text-4xl text-blue-500 mb-3"></i>
                <h1 class="text-2xl font-bold text-gray-800">MedNotes</h1>
                <p class="text-gray-600">Sua caderneta médica digital</p>
            </div>

            <form method='post' id="login-form" class="space-y-4" action="index.php?action=login">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input type="email" name="email" id="email" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"/>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                    <input type="password" name="password" id="password" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"/>
                </div>

                <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
                    <i class="fas fa-sign-in-alt mr-2"></i> Entrar
                </button>
            </form>
        </div>
    </div>

    <script src="/public/home/login.js"></script>
</body>

</html>
