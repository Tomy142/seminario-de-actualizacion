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
void ArticleMenu();
void MenuOptions(const string& user);
void Changepassword(const string& user);
bool NewPasswordChecker(const string& newpassword);
bool PasswordChecker(const string& password);
void Exit();


class Customer{
    private:
        string user;
        string password;
    public:
        Customer(const string& user, const string& password);
        string getUser() const {return user;}
        string getPassword() const {return password;}
        void setPassword(const string& newpassword){password = newpassword;}
};

Customer ::Customer( const string& user,  const string& password) : user(user), password(password){}

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
        void CreateCustomer(const string& user,  const string& password);
        shared_ptr<Customer> ValidateCustomer(const string& user, const string& password);
        shared_ptr<Customer> GetCustomer(const string& user);
        void CreateArticle(int id, const string& name, double price, int stock);
        const vector<shared_ptr<Article>>& getArticles() const;
        shared_ptr<Article> getArticlesById(int id)const;
        void ListArticle();
        void AddArticle();
        void EditArticle();
        void DeleteArticle();
};

CompanyManager companyManager;

CompanyManager::CompanyManager(){
    customers.push_back(make_shared<Customer>("Juan","12345"));
    customers.push_back(make_shared<Customer>("Pedro","54321"));
    customers.push_back(make_shared<Customer>("Jose", "121212"));

    articles.push_back(make_shared<Article>(1,"Lavandina x 1L", 875.25, 3000));
    articles.push_back(make_shared<Article>(4, "Detergente x 500mL",1102.45, 2010));
    articles.push_back(make_shared<Article>(22,"Jabon en polvo x 250g", 650.22, 407));
};

void CompanyManager ::CreateCustomer( const string& user, const string& password){
    customers.push_back(make_shared<Customer>(user, password));
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

shared_ptr<Customer>  CompanyManager::ValidateCustomer(const string& user, const string& password){
    for (const auto& customer : customers){
        if(customer->getUser()== user && customer->getPassword() == password){
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
    string user, password;

    cin.ignore();
    cout<<"--Registro de Usuarios--"<<endl;
    cout<<endl;
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
        companyManager.CreateCustomer(user, password);
        cout<<"Usuario creado correctamente"<<endl;
    }
    MainMenu();
}

void LoginUser()
{
    string user;
    string password;
    int trys = 0;
    int maxtrys = 3;

    cout<<"--Inicio de Sesion--"<<endl;
    
    while (trys < maxtrys){
        cout<<"Ingrese su usuario: ";
        getline(cin, user);
        cout<<"Ingrese su contraseña: ";
        getline(cin, password);
        system("cls");

        if(companyManager.ValidateCustomer(user, password)){
            cout<<"Bienvenido, "<<user<<endl;
            UserMenu(user);
        }else{
            cout<<"Usuario y/o contraseña incorrecta"<<endl;
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

    

    unordered_map<string, function<void()>> Options_M ={
        {"1", [&](){Changepassword(user);}},
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

void ArticleMenu()
{
    
    system("cls");
    int artopt;
    
    cout<<"---Gestor de Articulos---"<<endl;
    cout<<endl;
    cout<<"1. Listar Articulo"<<endl;
    cout<<"2. Agregar Articulo"<<endl;
    cout<<"3. Editar Articulo"<<endl;
    cout<<"4. Eliminar Articulo"<<endl;
    cout<<"Su opcion: ";
    cin>>artopt;
    cin.ignore();

    switch (artopt)
    {
        case 1 :
                companyManager.ListArticle();
            break;
    
        case 2 :
                companyManager.AddArticle();
            break;
        case 3 :
                companyManager.EditArticle();
            break;    
        case 4 :
                companyManager.DeleteArticle();
            break;    
        default:
                cout<<"Opcion invalida"<<endl;
                ArticleMenu();
            break;
    }
}

void UserMenu(const string& user)
{
    
    cout<<"1. Cambiar contraseña"<<endl;
    cout<<"X. Salir"<<endl;

    MenuOptions( user);
}

void MainMenu()
{
    int mainopt;
    cout<<"--Bienvenido al gestor de pedidos--"<<endl;
    cout<<"1. Iniciar Sesion"<<endl;
    cout<<"2. Crear cuenta de usuario"<<endl;
    cout<<"3. Gestor de Articulos"<<endl;
    cout<<"Su opcion: ";
    cin>>mainopt;

    system("cls");

    switch (mainopt)
    {
    case 1:
            LoginUser();
        break;
    case 2:
            CreateUser();
        break;
    case 3:
            ArticleMenu();
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