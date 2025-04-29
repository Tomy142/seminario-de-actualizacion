#include <iostream>
#include <memory>
#include <vector>
#include <unordered_map>
#include <functional>
#include <cstdlib>
#include <regex>
#include <string>

using namespace std;

void MainMenu();
void LoginUser();
void CreateUser();
void UserMenu(const string& user);
void ArticleMenu(const string& role);
void MenuOptions(const string& user);
void Changepassword(const string& user);
bool NewPasswordChecker(const string& newpassword);
bool PasswordChecker(const string& password);
void Exit();


class Customer{
    private:
        string user;
        string password;
        string role;
    public:
        Customer(const string& user, const string& password, const string& role);
        string getUser() const {return user;}
        string getPassword() const {return password;}
        string getRole() const {return role;}
        void setPassword(const string& newpassword){password = newpassword;}
};

Customer ::Customer( const string& user,  const string& password, const string& role) : user(user), password(password), role(role){}

class Article{
    private:
        int id;
        string name;
        double price;
        int stock;
        
    public:
        Article(int id, const string& name, double price, int stock);
        void setId(int id);
        void setName(string& name);
        void setPrice(double price);
        void setStock(int stock);
        int getId();
        string getName();
        double getPrice();
        int getStock();
};

Article::Article(int id, const string& name, double price, int stock): id(id), name(name), price(price), stock(stock){}

void Article::setId(int id)
{
    this->id = id;
}

void Article::setName(string& name)
{
    this->name = name;
}

void Article::setPrice(double price)
{
    this->price = price;
}

void Article::setStock(int stock)
{
    this->stock = stock;
}

int Article::getId(){
    return id;
}

string Article::getName(){
    return name;
}

double Article::getPrice(){
    return price;
}
int Article::getStock(){
    return stock;
}

class CompanyManager{
    private:
        vector<shared_ptr<Customer>>customers;
        vector<shared_ptr<Article>>articles;
    public:
        CompanyManager();
        void CreateCustomer(const string& user,  const string& password, const string& role);
        shared_ptr<Customer> ValidateCustomer(const string& user, const string& password, const string& role);
        shared_ptr<Customer> GetCustomer(const string& user);
        void CreateArticle(int id, const string& name, double price, int stock);
        const vector<shared_ptr<Article>>& getArticles() const;
        shared_ptr<Article> getArticlesById(int id)const;
        void ListArticle();
        void AddArticle();
        void EditArticle();
        void DeleteArticle();
        void BuyArticle();
};

CompanyManager companyManager;

CompanyManager::CompanyManager(){
    customers.push_back(make_shared<Customer>("Juan","12345","Administrador"));
    customers.push_back(make_shared<Customer>("Pedro","54321", "Cliente"));
    customers.push_back(make_shared<Customer>("Jose", "121212","Vendedor"));

    articles.push_back(make_shared<Article>(1,"Lavandina x 1L", 875.25, 3000));
    articles.push_back(make_shared<Article>(4, "Detergente x 500mL",1102.45, 2010));
    articles.push_back(make_shared<Article>(22,"Jabon en polvo x 250g", 650.22, 407));
};

void CompanyManager ::CreateCustomer( const string& user, const string& password, const string& role){
    customers.push_back(make_shared<Customer>(user, password, role));
}

void CompanyManager::CreateArticle(int id, const string& name, double price, int stock){
    articles.push_back(make_shared<Article>(id, name, price, stock));
}

const vector<shared_ptr<Article>>& CompanyManager::getArticles()const{
    return articles;
}

shared_ptr<Article>CompanyManager::getArticlesById(int id)const{
    for(const auto& article : articles){
        if(article->getId() == id){
            return article;
        }
    }
    return nullptr;
}

void CompanyManager::ListArticle(){
    
    if(articles.empty()){
        cout<<"No hay articulos cargados." <<endl;
        return;
    }
    
    for(const auto& article : articles){
        cout<<"ID: "<<article->getId()<<", Nombre: "<<article->getName()<<", Precio: "<<article->getPrice()<<", Stock: "<<article->getStock()<<endl;
    }
}
void CompanyManager::AddArticle(){
    int id;
    string name;
    double price;
    int stock;

    cout<<"Ingrese el ID del articulo: ";
    cin>>id;
    cin.ignore();
    cout<<"Ingrese el nombre del articulo: ";
    getline(cin, name);
    cout<<"Ingrese el precio del articulo: ";
    cin>>price;
    cin.ignore();
    cout<<"Ingrese el stock del articulo: ";
    cin>>stock;
    CreateArticle(id,name,price,stock);
    cout<<"Articulo cargado correctamente";

}

void CompanyManager::EditArticle(){
    int editId;

    cout<<"Ingrese el ID del articulo a modificar: ";
    cin>> editId;
    cin.ignore();

    shared_ptr<Article> article = getArticlesById(editId);

    if (article)
    {
        string newName;
        double newPrice;
        int newStock;

        cout<<"Articulo encontrado: "<<endl;
        cout<<"ID: "<<article->getId()<<", Nombre: "<<article->getName()<<", Precio: "<<article->getPrice()<<", Stock: "<<article->getStock()<<endl;

        cout<<"Ingrese el nuevo nombre del articulo (enter para dejar sin modificar): ";
        getline(cin, newName);
        if(!newName.empty()){
            article->setName(newName);
        }

        cout<<"Ingrese el nuevo precio del articulo (0 para dejar sin cambios): ";
        cin>>newPrice;
        if(newPrice >= 0){
            article->setPrice(newPrice);
        }
        cin.ignore();
        cout<<"Ingrese el nuevo stock del articulo (-1 para dejar sin cambios): ";
        cin>>newStock;
        if(newStock >= 0){
            article->setStock(newStock);
        }

        cout<<"\nArticulo actualizado correctamente.\n";
    }else{
        cout<<"Articulo no encontrado con el ID: "<<editId<<endl;
    }
    
    
    
}
void CompanyManager::DeleteArticle(){
    int deleteId;
    char confirm;

    cout<<"Ingrese el ID del articulo que desea eliminar: ";
    cin>>deleteId;
    cin.ignore();

    auto it = articles.begin();
    while(it != articles.end()){
        if((*it)->getId() == deleteId){
            cout<<"Articulo encontrado"<<(*it)->getName()<<endl;
            cout<<"¿Esta seguro que desea eliminarlo? (s/n): ";
            cin>>confirm;
            cin.ignore();

            if(confirm=='s' || confirm == 'S'){
                it = articles.erase(it);
                cout<<"Articulo eliminado correcatamente."<<endl;
            }else{
                cout<<"Operacion cancelada."<<endl;
                ++it;
            }
            return;
        }else{
            ++it;
        }
    }

    cout<<"No se encontro ningun articulo con el ID: "<<deleteId<<endl;
}

void CompanyManager::BuyArticle()
{
    int articleId;
    int quantity;

    cout<<"Ingrese el ID del articulo que desea comprar: ";
    cin>>articleId;
    cin.ignore();

    shared_ptr<Article> article = getArticlesById(articleId);

    if(article==nullptr){
        cout<<"No se encontro nigun articulo con el ID ingresado."<<endl;
        return;
    }

    cout<<"Articulo encontrado: "<<article->getName()<<endl;
    cout<<"Stock disponible: "<< article->getStock()<<endl;
    cout<<"Cuantos desea comprar? "<<endl;
    cout<<"Cantidad: ";
    cin>> quantity;
    cin.ignore();

    if(quantity <= 0){
        cout<<"La cantidad debe ser mayor a 0"<<endl;
        return;
    }

    if(quantity > article->getStock()){
        cout<<"No hay suficiente stock disponible. Stock actual "<< article->getStock()<<endl;
        return;
    }

    article->setStock(article->getStock() - quantity);
    cout<<"Compra realizada con exito."<<endl;
}

shared_ptr<Customer>  CompanyManager::ValidateCustomer(const string& user, const string& password, const string& role){
    for (const auto& customer : customers){
        if(customer->getUser()== user && customer->getPassword() == password && customer->getRole() == role){
            return customer;
        }
    } 
    return nullptr;
}

shared_ptr<Customer> CompanyManager::GetCustomer(const string& user)
{
    for(const auto& customer : customers){
        if(customer->getUser() == user) {
            return customer;
        }
    }
    return nullptr; 
}

void CreateUser()
{
    string user, password, role;

    cout<<"--Registro de Usuarios--"<<endl;
    cout<<endl;
    cin.ignore();
    cout<<"Ingrese un nombre de usuario: ";
    getline(cin, user);
    cout<<"Ingrese su contraseña: "<<endl;
    cout<<"     Entre 8 y 16 caracteres."<<endl;
    cout<<"     Al menos una mayuscula."<<endl;
    cout<<"     Al menos 2 caracteres especiales."<<endl;
    cout<<"Contraseña: ";
    getline(cin,password);

    if(!PasswordChecker(password)){
        cout<<"Por favor, intente nuevamente."<<endl;
        cout<<"Presione enter para continuar"<<endl;
        CreateUser();
    }else{
        cout<<"Ingrese un rol valido: "<<endl;
        cout<<"Administrador | Cliente | Vendedor | Deposito"<<endl;
        cout<<"Su opcion: ";
        cin>>role;
        if(role == "Administrador" || role == "Cliente" || role == "Vendedor" ||role == "Deposito"){
            companyManager.CreateCustomer(user, password, role);
            cout<<"Usuario creado correctamente"<<endl;
        }else{
            cout<<"Rol invalido. Intente nuevamente."<<endl;
            CreateUser();
        }
        
    }
    MainMenu();
}

void LoginUser()
{
    string user;
    string password;
    string role;
    int trys = 0;
    int maxtrys = 3;

    cout<<"--Inicio de Sesion--"<<endl;
    cin.ignore();
    while (trys < maxtrys){
        cout<<"Ingrese su usuario: ";
        getline(cin, user);
        cout<<"Ingrese su contraseña: ";
        getline(cin, password);
        cout<<"Ingrese su rol: ";
        getline(cin, role);
        system("cls");

        if(companyManager.ValidateCustomer(user, password, role)){
            cout<<"Bienvenido, "<<user<<endl;
            UserMenu(user);
        }else{
            cout<<"Usuario, contraseña y/o rol incorrecto"<<endl;
            trys++;
        }
    }
    cout<<"Usuario bloqueado. Contacte al administrador"<<endl;
}

bool PasswordChecker( const string& password)
{
    regex passwordRegex("^(?=.*[A-Z])(?=.*[$!?#@%&*^-].*[$!?#@%&*^-])(?=.*[0-9])(?=.*[a-z]).{8,16}$");

    if(!regex_match(password, passwordRegex)){
        cout<<"La contraseña no cumple con los requisitos"<<endl;
        cout<<"Entre 8 y 16 caracteres."<<endl;
        cout<<"Al menos una mayuscula."<<endl;
        cout<<"Al menos 2 caracteres especiales."<<endl;
        return false;
    }
    return true;
}

bool NewPasswordChecker(const string& newpassword)
{
    regex passwordRegex("^(?=.*[A-Z])(?=.*[$!?#@%&*^-].*[$!?#@%&*^-])(?=.*[0-9])(?=.*[a-z]).{8,16}$");

    if(!regex_match(newpassword, passwordRegex)){
        cout<<"La contraseña no cumple con los requisitos"<<endl;
        cout<<"Entre 8 y 16 caracteres."<<endl;
        cout<<"Al menos una mayuscula."<<endl;
        cout<<"Al menos 2 caracteres especiales."<<endl;
        return false;
    }
    return true;
}

void Changepassword(const string& user)
{
    string newpassword;
    

    cout<<"---Cambiar contraseña--- "<<endl;
    cout<<"Ingrese su nueva contraseña: ";
    getline(cin, newpassword);

    if(!NewPasswordChecker(newpassword)){
        cout<<"Por favor, intente nuevamente."<<endl;
        return;
    }

    shared_ptr<Customer> customer = companyManager.GetCustomer(user);

    if(customer) {
        customer->setPassword(newpassword);
        cout<<"Contraseña cambiada con exito."<<endl;
    }else{
        cout<<"Error al cambiar la contraseña."<<endl;
    }

}

void Exit()
{
    cout<<"Saliendo..."<<endl;
    system("cls");
    LoginUser();
}

void MenuOptions( const string& user)
{
    string option;

    shared_ptr<Customer> customer = companyManager.GetCustomer(user);
    if(!customer){
        cout<<"Usuario no encontrado.\n";
        return;
    }

    string role = customer->getRole();

    unordered_map<string, function<void()>> Options_M ={
        {"1", [&](){Changepassword(user);}},
        {"2",[&](){ArticleMenu(role);}},
        {"3",[&](){CreateUser();}},
        {"X", Exit},
        {"x", Exit}
    };

    do{
        cout<<"Su opcion: ";
        cin>>option;
        cin.ignore();

        auto it =Options_M.find(option);
        if(it != Options_M.end()){
            it->second();
        }else{
            cout<<"Opcion invalida. Intente nuevamente"<<endl;
        }
    } while(option != "X" && option != "x");

}

void ArticleMenu(const string& role)
{
    
    int artopt;

    do{
        system("cls");
        cout<<"---Gestor de Articulos---"<<endl;
        cout<<endl;
        cout<<"1. Listar Articulo"<<endl;

        if(role == "Adminstrador" || role == "Deposito"){
            cout<<"2. Agregar Articulo"<<endl;
            cout<<"3. Editar Articulo"<<endl;
            cout<<"4. Eliminar Articulo"<<endl;
        }
        if(role == "Cliente" || role == "Vendedor"){
            cout<<"5. Comprar Articulo"<<endl;
        }

        cout<<"Su opcion: ";
        cin>>artopt;
        cin.ignore();

        switch (artopt)
        {
            case 1 :
                    companyManager.ListArticle();
                break;
        
            case 2 :
                if(role== "Administrador" || role== "Deposito") companyManager.AddArticle();
                else cout<<"No tiene permisos para esta accion."<<endl;
                break;
            case 3 :
                if(role== "Administrador" || role== "Deposito") companyManager.EditArticle();
                else cout<<"No tiene permisos para esta accion."<<endl;
                break;    
            case 4 :
                if(role== "Administrador" || role== "Deposito") companyManager.DeleteArticle();
                else cout<<"No tiene permisos para esta accion."<<endl;
                break;
            case 5 :
                if(role== "Cliente" || role== "Vendedor") companyManager.BuyArticle();
                else cout<<"No tiene permisos para esta accion."<<endl;
                break;      
            default:
                    cout<<"Opcion invalida"<<endl;
                    ArticleMenu(role);
                break;
        }
    }while (artopt!=0);    
}

void UserMenu(const string& user)
{
    
    cout<<"1. Cambiar contraseña"<<endl;
    cout<<"2. Gestor de Articulos"<<endl;
    cout<<"3. Crear nuevo usuario"<<endl;
    cout<<"X. Salir"<<endl;

    MenuOptions( user);
}

void MainMenu()
{
    int mainopt;
    cout<<"--Bienvenido al gestor de pedidos--"<<endl;
    cout<<"1. Iniciar Sesion"<<endl;
    cout<<"Su opcion: ";
    cin>>mainopt;

    system("cls");

    switch (mainopt)
    {
    case 1:
            LoginUser();
        break;
    default:
        break;
    }
}

int main ()
{
    MainMenu();
    return 0;
}