"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Simple translation object for demonstration
const translations = {
  en: {
    title: "Simple I18n Example",
    description: "This is a simple internationalization example",
    greeting: "Hello, World!",
    welcome: "Welcome to our application!",
    currentTime: "Current Time",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    success: "Success",
    error: "Error",
    pending: "Pending",
    processing: "Processing",
    language: "Language",
    selectLanguage: "Select Language",
    examples: "Translation Examples",
    uiElements: "UI Elements",
    status: "Status Messages",
  },
  fr: {
    title: "Exemple I18n Simple",
    description: "Ceci est un exemple simple d'internationalisation",
    greeting: "Bonjour le monde !",
    welcome: "Bienvenue dans notre application !",
    currentTime: "Heure Actuelle",
    save: "Sauvegarder",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    success: "Succès",
    error: "Erreur",
    pending: "En attente",
    processing: "En cours",
    language: "Langue",
    selectLanguage: "Sélectionner la langue",
    examples: "Exemples de traduction",
    uiElements: "Éléments d'interface",
    status: "Messages de statut",
  },
  es: {
    title: "Ejemplo I18n Simple",
    description: "Este es un ejemplo simple de internacionalización",
    greeting: "¡Hola, mundo!",
    welcome: "¡Bienvenido a nuestra aplicación!",
    currentTime: "Hora Actual",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    success: "Éxito",
    error: "Error",
    pending: "Pendiente",
    processing: "Procesando",
    language: "Idioma",
    selectLanguage: "Seleccionar idioma",
    examples: "Ejemplos de traducción",
    uiElements: "Elementos de interfaz",
    status: "Mensajes de estado",
  },
  ar: {
    title: "مثال I18n بسيط",
    description: "هذا مثال بسيط للتدويل",
    greeting: "مرحباً بالعالم!",
    welcome: "مرحباً بك في تطبيقنا!",
    currentTime: "الوقت الحالي",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    success: "نجح",
    error: "خطأ",
    pending: "في الانتظار",
    processing: "معالجة",
    language: "اللغة",
    selectLanguage: "اختر اللغة",
    examples: "أمثلة الترجمة",
    uiElements: "عناصر الواجهة",
    status: "رسائل الحالة",
  },
};

const localeFlags = {
  en: "🇺🇸",
  fr: "🇫🇷",
  es: "🇪🇸",
  ar: "🇸🇦",
};

const localeNames = {
  en: "English",
  fr: "Français",
  es: "Español",
  ar: "العربية",
};

export function SimpleI18nExample() {
  const [currentLocale, setCurrentLocale] = useState<keyof typeof translations>("en");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const t = (key: string) => {
    return translations[currentLocale][key as keyof (typeof translations)[typeof currentLocale]] || key;
  };

  const handleLanguageChange = (newLocale: keyof typeof translations) => {
    setCurrentLocale(newLocale);
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">🌍 {t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Language Display */}
        <div className="bg-muted flex items-center justify-between rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{localeFlags[currentLocale]}</span>
            <div>
              <p className="font-semibold">{localeNames[currentLocale]}</p>
              <p className="text-muted-foreground text-sm">Current Language</p>
            </div>
          </div>
          <Badge variant="secondary">{currentLocale.toUpperCase()}</Badge>
        </div>

        {/* Language Toggle Buttons */}
        <div className="space-y-3">
          <h3 className="font-semibold">{t("selectLanguage")}:</h3>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(translations) as Array<keyof typeof translations>).map((lang) => (
              <Button
                key={lang}
                variant={currentLocale === lang ? "default" : "outline"}
                onClick={() => handleLanguageChange(lang)}
                className="flex items-center gap-2"
              >
                <span>{localeFlags[lang]}</span>
                <span>{localeNames[lang]}</span>
                {currentLocale === lang && (
                  <Badge variant="secondary" className="ml-auto">
                    Active
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Translation Examples */}
        <div className="space-y-4">
          <h3 className="font-semibold">{t("examples")}:</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Greeting:</h4>
              <p className="text-lg">{t("greeting")}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Welcome:</h4>
              <p className="text-lg">{t("welcome")}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">{t("currentTime")}:</h4>
            <p className="font-mono text-lg">
              {currentTime.toLocaleString(currentLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Common UI Elements */}
        <div className="space-y-3">
          <h3 className="font-semibold">{t("uiElements")}:</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">{t("save")}</Button>
            <Button size="sm" variant="outline">
              {t("cancel")}
            </Button>
            <Button size="sm" variant="destructive">
              {t("delete")}
            </Button>
            <Button size="sm" variant="secondary">
              {t("edit")}
            </Button>
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-3">
          <h3 className="font-semibold">{t("status")}:</h3>
          <div className="space-y-2">
            <Badge variant="default">{t("success")}</Badge>
            <Badge variant="secondary">{t("pending")}</Badge>
            <Badge variant="destructive">{t("error")}</Badge>
            <Badge variant="outline">{t("processing")}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
