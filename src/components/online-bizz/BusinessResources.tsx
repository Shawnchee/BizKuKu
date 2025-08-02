import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { BookOpen } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface Resource {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  action: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: any;
  difficulty: string;
  time: string;
}

interface BusinessResourcesProps {
  helpResources: Resource[];
  quickStartGuides: Guide[];
}

export default function BusinessResources({
  helpResources,
  quickStartGuides
}: BusinessResourcesProps) {
  const { t } = useLanguage()

  return (
    <>
      {/* Help Resources for Uncle/Aunty */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('online_business.help.title')}</h2>
          <p className="text-gray-600">
            {t('online_business.help.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpResources.map((resource) => {
            // Map resource IDs to translation keys
            const getTranslationKey = (id: string, field: string) => {
              const keyMap: Record<string, string> = {
                'video-tutorials': 'video_tutorials',
                'whatsapp-support': 'whatsapp_support',
                'phone-support': 'phone_support'
              }
              return `online_business.help.${keyMap[id]}.${field}`
            }

            return (
              <Card
                key={resource.id}
                className="p-4 text-center hover:shadow-lg transition-shadow bg-white border-2 hover:border-blue-300"
              >
                <div className={`inline-flex p-3 rounded-full ${resource.color} mb-3`}>
                  <resource.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t(getTranslationKey(resource.id, 'title'))}</h3>
                <p className="text-sm text-gray-600 mb-3">{t(getTranslationKey(resource.id, 'description'))}</p>
                <Button size="sm" className="w-full cursor-pointer">
                  {t(getTranslationKey(resource.id, 'action'))}
                </Button>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Start Guides */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('online_business.guides.title')}</h2>
          <p className="text-gray-600">{t('online_business.guides.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickStartGuides.map((guide) => {
            // Map guide IDs to translation keys
            const getGuideTranslationKey = (id: string, field: string) => {
              const keyMap: Record<string, string> = {
                'photography-tips': 'photography',
                'pricing-guide': 'pricing',
                'shipping-guide': 'shipping'
              }
              return `online_business.guides.${keyMap[id]}.${field}`
            }

            return (
              <Card
                key={guide.id}
                className="p-4 hover:shadow-lg transition-shadow bg-white border-2 hover:border-green-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <guide.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">{t(getGuideTranslationKey(guide.id, 'difficulty'))}</Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t(getGuideTranslationKey(guide.id, 'title'))}</h3>
                <p className="text-sm text-gray-600 mb-3">{t(getGuideTranslationKey(guide.id, 'description'))}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{t(getGuideTranslationKey(guide.id, 'time'))}</span>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent cursor-pointer">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {t('online_business.guides.read')}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}