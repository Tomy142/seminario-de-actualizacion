#include <iostream>
#include <memory>
#include <vector>
#include <unordered_map>
#include <functional>

using namespace std;

void LoginUser();
void UserMenu(const string& user);
void MenuOptions(const string& user);
void Changepassword(const string& user);
void Exit();

int main ()
{
    LoginUser();
    return 0;
}

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


class CompanyManager{
    private:
        vector<shared_ptr<Customer>>customers;
    public:
        CompanyManager();
        void CreateCustomer(const string& user,  const string& password);
        shared_ptr<Customer> ValidateCustomer(const string& user, const string& password);
};

CompanyManager::CompanyManager(){
    customers.push_back(make_shared<Customer>("Juan","12345"));
    customers.push_back(make_shared<Customer>("Pedro","54321"));
    customers.push_back(make_shared<Customer>("Jose", "121212"));
};

void CompanyManager ::CreateCustomer( const string& user, const string& password){
    customers.push_back(make_shared<Customer>(user, password));
}

shared_ptr<Customer>  CompanyManager::ValidateCustomer(const string& user, const string& password){
    for (const auto& customer : customers){
        if(customer->getUser()== user && customer->getPassword() == password){
            return customer;
        }
    } 
    return nullptr;
}

void LoginUser()
{
    CompanyManager companyManager;
    string user;
    string password;
    string error = "Usuario y/o contraseña incorrecta";
    int trys = 0;
    int maxtrys = 3;

    cout<<"--Gestion de pedidos--"<<endl;
    
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

void Changepassword(const string& user)
{
    CompanyManager companyManager;
    string newpassword;

    cout<<"---Cambiar contraseña--- "<<endl;
    cout<<"Ingrese su nueva contraseña: ";
    getline(cin, newpassword);

    shared_ptr<Customer> customer = companyManager.ValidateCustomer(user, newpassword);

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

void UserMenu(const string& user)
{
    
    cout<<"1. Cambiar contraseña"<<endl;
    cout<<"X. Salir"<<endl;

    MenuOptions( user);
}

