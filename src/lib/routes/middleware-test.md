# Middleware Testing Guide

## Expected Behavior

### Unauthenticated Users

- **Public routes**: ✅ Accessible (e.g., `/`, `/shop`, `/about`)
- **Auth routes**: ✅ Accessible (e.g., `/login`, `/signup`)
- **Protected routes**: ❌ Redirected to `/login` with callback URL

### Authenticated Users by Role

#### CUSTOMER Role

- **Public routes**: ✅ Accessible
- **Customer routes**: ✅ Accessible (e.g., `/shop/checkout/*`, `/shop/profile`)
- **Admin routes**: ❌ Redirected to `/` (customer homepage)
- **Vendor routes**: ❌ Redirected to `/` (customer homepage)
- **Auth routes**: ❌ Redirected to `/` (customer homepage)

#### VENDOR Role

- **Public routes**: ✅ Accessible
- **Vendor routes**: ✅ Accessible (e.g., `/dashboard/home`, `/dashboard/products`)
- **Admin routes**: ❌ Redirected to `/dashboard/home` (vendor homepage)
- **Customer routes**: ❌ Redirected to `/dashboard/home` (vendor homepage)
- **Auth routes**: ❌ Redirected to `/dashboard/home` (vendor homepage)

#### ADMIN Role

- **Public routes**: ✅ Accessible
- **Admin routes**: ✅ Accessible (e.g., `/admin/home`, `/admin/users`)
- **Vendor routes**: ❌ Redirected to `/admin/home` (admin homepage)
- **Customer routes**: ❌ Redirected to `/admin/home` (admin homepage)
- **Auth routes**: ❌ Redirected to `/admin/home` (admin homepage)

#### SUPER_ADMIN Role

- **All routes**: ✅ Accessible (full system access)

## Test Cases

### Test 1: Unauthenticated User Accessing Admin Route

**URL**: `http://localhost:3000/en/admin/home?page=1`
**Expected**: Redirect to `http://localhost:3000/en/login?callbackUrl=%2Fen%2Fadmin%2Fhome%3Fpage%3D1`

### Test 2: Customer Accessing Admin Route

**URL**: `http://localhost:3000/en/admin/home`
**Expected**: Redirect to `http://localhost:3000/en/` (customer homepage)

### Test 3: Admin Accessing Customer Route

**URL**: `http://localhost:3000/en/shop/checkout/123`
**Expected**: Redirect to `http://localhost:3000/en/admin/home` (admin homepage)

### Test 4: Authenticated User on Login Page

**URL**: `http://localhost:3000/en/login`
**Expected**: Redirect to role-appropriate homepage

## Debugging

If the middleware is not working as expected:

1. **Check authentication state**: Verify `request.auth` is properly set
2. **Check route matching**: Ensure routes are properly defined in `routes.ts`
3. **Check locale handling**: Verify locale prefixes are being stripped correctly
4. **Check role hierarchy**: Ensure role-based access logic is correct

## Common Issues

1. **Infinite redirects**: Usually caused by incorrect route definitions
2. **Unauthorized access**: Check if `authorized` callback is interfering
3. **Locale issues**: Ensure locale prefixes are handled correctly
4. **Role not found**: Verify user role is properly set in auth session
