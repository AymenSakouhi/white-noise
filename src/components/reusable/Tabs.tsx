import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type TabsProps = {
  content: {
    title: string
    children: React.ReactNode
  }[]
}

const TabsDemo: React.FC<TabsProps> = ({ content }) => {
  return (
    <Tabs defaultValue={content[0].title} className="col-span-full px-12">
      <TabsList className="grid w-full grid-cols-2">
        {content.map(({ title }) => (
          <TabsTrigger key={title} value={title}>
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {content.map(({ title, children }) => (
        <TabsContent value={title} key={title}>
          <Card>
            <CardContent className="space-y-2">{children}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TabsDemo
