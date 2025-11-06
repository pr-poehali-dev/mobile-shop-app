import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  specs: {
    display?: string;
    processor?: string;
    memory?: string;
    battery?: string;
    audio?: string;
    connectivity?: string;
  };
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Vertu Signature',
    price: 299000,
    image: 'https://cdn.poehali.dev/projects/617226af-2eda-404d-a178-83677b4c66cc/files/64c43c9f-2cd7-46f9-932e-e85a5f288ee4.jpg',
    category: 'Смартфоны',
    specs: {
      display: '6.7" AMOLED',
      processor: 'Snapdragon 8 Gen 2',
      memory: '512GB',
      battery: '5000 mAh'
    },
    rating: 5.0
  },
  {
    id: 2,
    name: 'Bang & Olufsen Beoplay H95',
    price: 89000,
    image: 'https://cdn.poehali.dev/projects/617226af-2eda-404d-a178-83677b4c66cc/files/4689192b-d881-464e-b5b7-f87aff765106.jpg',
    category: 'Аудио',
    specs: {
      audio: 'ANC Pro',
      battery: '38 часов',
      connectivity: 'Bluetooth 5.1'
    },
    rating: 4.9
  },
  {
    id: 3,
    name: 'MacBook Pro 16" M3 Max',
    price: 349000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    category: 'Ноутбуки',
    specs: {
      display: '16.2" Liquid Retina XDR',
      processor: 'Apple M3 Max',
      memory: '1TB SSD'
    },
    rating: 5.0
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const addToCompare = (product: Product) => {
    if (compareList.length < 3 && !compareList.find(p => p.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  const removeFromCompare = (id: number) => {
    setCompareList(compareList.filter(p => p.id !== id));
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="glass-effect overflow-hidden border-border/50 animate-fade-in">
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 bg-background/60 backdrop-blur-sm hover:bg-background/80"
          onClick={() => toggleFavorite(product.id)}
        >
          <Icon 
            name={favorites.includes(product.id) ? "Heart" : "Heart"} 
            className={favorites.includes(product.id) ? "fill-accent text-accent" : ""}
            size={20}
          />
        </Button>
      </div>
      <div className="p-4 space-y-3">
        <Badge variant="secondary" className="text-xs">{product.category}</Badge>
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex items-center gap-1">
          <Icon name="Star" size={14} className="fill-accent text-accent" />
          <span className="text-sm text-muted-foreground">{product.rating}</span>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="capitalize">{key}</span>
              <span className="text-foreground">{value}</span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-border/50">
          <p className="text-2xl font-semibold mb-3">{product.price.toLocaleString('ru-RU')} ₽</p>
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => addToCart(product)}
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              В корзину
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => addToCompare(product)}
            >
              <Icon name="ArrowLeftRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  const CartSheet = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icon name="ShoppingBag" size={24} />
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
              {cart.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="glass-effect w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl">Корзина</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Корзина пуста</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <Card key={index} className="p-3 glass-effect">
                  <div className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-accent font-semibold mt-1">{item.price.toLocaleString('ru-RU')} ₽</p>
                    </div>
                  </div>
                </Card>
              ))}
              <div className="pt-4 border-t border-border/50">
                <div className="flex justify-between mb-4">
                  <span className="text-lg">Итого:</span>
                  <span className="text-2xl font-bold text-accent">
                    {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  const CompareSheet = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icon name="ArrowLeftRight" size={24} />
          {compareList.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
              {compareList.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="glass-effect w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="text-2xl">Сравнение</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          {compareList.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Добавьте товары для сравнения</p>
          ) : (
            <div className="space-y-6">
              {compareList.map((product) => (
                <Card key={product.id} className="p-4 glass-effect">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeFromCompare(product.id)}
                    >
                      <Icon name="X" size={18} />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border/30">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Цена</span>
                      <span className="font-bold text-accent">{product.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">LUXE</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Search" size={24} />
            </Button>
            <CompareSheet />
            <CartSheet />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsContent value="home" className="space-y-6 mt-0">
            <div className="premium-gradient rounded-2xl p-8 text-center space-y-4 animate-scale-in">
              <Badge variant="outline" className="border-accent text-accent">Эксклюзивная коллекция</Badge>
              <h2 className="text-3xl font-bold">Премиальная техника</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Откройте для себя мир роскошных устройств с безупречным качеством
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {['Смартфоны', 'Аудио', 'Ноутбуки'].map((category) => (
                <Button 
                  key={category}
                  variant="outline" 
                  className="h-auto py-4 flex-col gap-2 glass-effect hover:border-accent transition-colors"
                >
                  <Icon name="Smartphone" size={24} />
                  <span className="text-sm">{category}</span>
                </Button>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Избранное</h3>
              <div className="grid gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="catalog" className="mt-0">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Каталог</h2>
              <div className="grid gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Избранное</h2>
              {favorites.length === 0 ? (
                <Card className="p-12 text-center glass-effect">
                  <Icon name="Heart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Добавьте товары в избранное</p>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {products.filter(p => favorites.includes(p.id)).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <div className="space-y-4">
              <Card className="p-6 glass-effect text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-accent/20 mx-auto flex items-center justify-center">
                  <Icon name="User" size={40} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Профиль</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="ShoppingBag" size={18} className="mr-3" />
                    Мои заказы
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Bell" size={18} className="mr-3" />
                    Уведомления
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Settings" size={18} className="mr-3" />
                    Настройки
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border/50 backdrop-blur-xl animate-slide-up">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            {[
              { id: 'home', icon: 'Home', label: 'Главная' },
              { id: 'catalog', icon: 'LayoutGrid', label: 'Каталог' },
              { id: 'favorites', icon: 'Heart', label: 'Избранное' },
              { id: 'profile', icon: 'User', label: 'Профиль' }
            ].map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex-col h-auto py-2 gap-1 ${activeTab === item.id ? 'text-accent' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon name={item.icon as any} size={24} />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
